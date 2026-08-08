from typing import Optional

from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User, ProviderEnum
from app.models.login_event import LoginEvent
from app.core.security import create_access_token
from app.core import oauth_google, oauth_github
from app.config import settings
from datetime import datetime, timezone

router = APIRouter(prefix="/auth", tags=["oauth"])


def _find_or_create_oauth_user(db: Session, provider: ProviderEnum, provider_id: str, email: str, name: str, picture: Optional[str]) -> User:
    user = db.query(User).filter(User.provider == provider, User.provider_id == provider_id).first()
    if user:
        return user

    user = db.query(User).filter(User.email == email).first()
    if user:
        # Existing email-based account logging in via OAuth for the first time
        user.provider = provider
        user.provider_id = provider_id
        user.email_verified = True
        if picture:
            user.profile_picture = picture
        db.commit()
        db.refresh(user)
        return user

    user = User(
        name=name,
        email=email,
        provider=provider,
        provider_id=provider_id,
        profile_picture=picture,
        email_verified=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


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


@router.get("/google")
def google_login():
    return RedirectResponse(oauth_google.get_google_auth_url())


@router.get("/google/callback")
async def google_callback(code: str, request: Request, db: Session = Depends(get_db)):
    access_token = await oauth_google.exchange_code_for_token(code)
    profile = await oauth_google.get_google_profile(access_token)

    user = _find_or_create_oauth_user(
        db,
        provider=ProviderEnum.google,
        provider_id=profile["sub"],
        email=profile["email"],
        name=profile.get("name", profile["email"]),
        picture=profile.get("picture"),
    )
    _record_login(db, user, ProviderEnum.google, request)

    token = create_access_token({"sub": str(user.id)})
    return RedirectResponse(f"{settings.FRONTEND_URL}/auth/callback?token={token}")


@router.get("/github")
def github_login():
    return RedirectResponse(oauth_github.get_github_auth_url())


@router.get("/github/callback")
async def github_callback(code: str, request: Request, db: Session = Depends(get_db)):
    access_token = await oauth_github.exchange_code_for_token(code)
    profile = await oauth_github.get_github_profile(access_token)

    user = _find_or_create_oauth_user(
        db,
        provider=ProviderEnum.github,
        provider_id=str(profile["id"]),
        email=profile["email"],
        name=profile.get("name") or profile.get("login"),
        picture=profile.get("avatar_url"),
    )
    _record_login(db, user, ProviderEnum.github, request)

    token = create_access_token({"sub": str(user.id)})
    return RedirectResponse(f"{settings.FRONTEND_URL}/auth/callback?token={token}")