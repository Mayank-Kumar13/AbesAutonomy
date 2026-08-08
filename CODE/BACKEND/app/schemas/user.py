from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserUpdateRequest(BaseModel):
    name: Optional[str] = None
    profile_picture: Optional[str] = None


class AdminUserRow(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    provider: str
    role: str
    created_at: datetime
    last_login: Optional[datetime] = None
    login_count: int
    email_verified: bool

    class Config:
        from_attributes = True


class AdminStatsResponse(BaseModel):
    total_users: int
    new_users_today: int
    new_users_this_week: int
    new_users_this_month: int
    total_login_events: int
    active_users: int
    google_users: int
    github_users: int
    email_users: int
    