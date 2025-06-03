from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserUpdate, UserResponse
from app.core.security import get_password_hash

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.put("/user", response_model=UserResponse)
def update_user(
    user_update: UserUpdate = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if user_update.email:
        existing_user = (
            db.query(User)
            .filter(User.email == user_update.email)
            .filter(User.id != current_user.id)
            .first()
        )
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="This email is already in use by another account."
            )

    user = db.query(User).filter(User.id == current_user.id).first()

    if user_update.password:
        user.hashed_password = get_password_hash(user_update.password)
    if user_update.email:
        user.email = user_update.email
    if user_update.name is not None:
        user.name = user_update.name
    if user_update.bio is not None:
        user.bio = user_update.bio

    db.commit()
    db.refresh(user)
    return user

@router.get("/user/me", response_model=UserResponse)
def get_current_user_info(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return current_user
