from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse
from app.schemas.email_request import EmailRequest
from app.models.user import User
from app.db.session import SessionLocal
from passlib.context import CryptContext
from app.schemas.user import UserLogin
from app.core.security import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from app.utils.email_token import generate_confirmation_token, confirm_token
from app.core.email import send_verification_email

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        if not existing_user.is_verified:
            token = generate_confirmation_token(existing_user.email)
            send_verification_email(existing_user.email, token)
            raise HTTPException(
                status_code=202,
                detail="Account already exists but is not verified. Verification email has been resent."
            )
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password, is_verified=False)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = generate_confirmation_token(user.email)
    send_verification_email(user.email, token)

    return {"message": "Registration successful. Please check your email to verify your account."}


@router.post("/auth/login")
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == form_data.username).first()

    if not db_user or not pwd_context.verify(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not db_user.is_verified:
        raise HTTPException(status_code=403, detail="Email is not verified")

    token = create_access_token(data={"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/auth/resend-verification")
def resend_verification(data: EmailRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_verified:
        return {"message": "Email is already verified."}

    token = generate_confirmation_token(user.email)
    send_verification_email(user.email, token)
    return {"message": "Verification email sent."}
