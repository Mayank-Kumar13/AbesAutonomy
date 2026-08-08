import secrets
import hashlib
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User, ProviderEnum
from app.models.login_event import LoginEvent
from app.models.password_reset_token import PasswordResetToken
from app.schemas.auth import (
    SignupRequest,
    LoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    AuthResponse,
    UserPublic,
)
from app.core.security import hash_password, verify_password, create_access_token
from app.core.deps import get_current_user
from app.services.email import send_reset_email
from app.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])


def _record_login(db: Session, user: User, provider: ProviderEnum, request: Request):
    user.last_login = datetime.now(timezone.utc)
    user.login_count = (user.login_count or 0) + 1
    db.add(LoginEvent(
        user_id=user.id,
        provider=provider,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    ))
    db.commit()
    db.refresh(user)


@router.post("/signup", response_model=AuthResponse)
def signup(payload: SignupRequest, request: Request, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        provider=ProviderEnum.email,
        email_verified=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    _record_login(db, user, ProviderEnum.email, request)

    token = create_access_token({"sub": str(user.id)})
    return AuthResponse(access_token=token, user=UserPublic.model_validate(user))


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not user.password_hash or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    _record_login(db, user, ProviderEnum.email, request)

    token = create_access_token({"sub": str(user.id)})
    return AuthResponse(access_token=token, user=UserPublic.model_validate(user))


@router.post("/logout")
def logout(current_user: User = Depends(get_current_user)):
    # Stateless JWT — logout is handled client-side by discarding the token.
    return {"detail": "Logged out"}


@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if user:
        raw_token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(raw_token.encode()).hexdigest()

        db.add(PasswordResetToken(
            user_id=user.id,
            token_hash=token_hash,
            expires_at=datetime.now(timezone.utc) + timedelta(minutes=30),
        ))
        db.commit()

        reset_link = f"{settings.FRONTEND_URL}/reset-password?token={raw_token}"
        send_reset_email(user.email, reset_link)

    return {"detail": "If that email exists, a reset link has been sent"}


@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    token_hash = hashlib.sha256(payload.token.encode()).hexdigest()

    reset_token = (
        db.query(PasswordResetToken)
        .filter(PasswordResetToken.token_hash == token_hash)
        .first()
    )

    if (
        not reset_token
        or reset_token.used
        or reset_token.expires_at < datetime.now(timezone.utc)
    ):
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user = db.query(User).filter(User.id == reset_token.user_id).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user.password_hash = hash_password(payload.new_password)
    reset_token.used = True
    db.commit()

    return {"detail": "Password reset successful"}