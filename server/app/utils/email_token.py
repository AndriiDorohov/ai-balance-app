from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from app.core.config import settings

def get_serializer():
    return URLSafeTimedSerializer(settings.SECRET_KEY)

def generate_confirmation_token(email: str) -> str:
    serializer = get_serializer()
    return serializer.dumps(email, salt=settings.SECURITY_PASSWORD_SALT)

def confirm_token(token: str, expiration: int = 3600) -> str | None:
    serializer = get_serializer()
    try:
        email = serializer.loads(
            token,
            salt=settings.SECURITY_PASSWORD_SALT,
            max_age=expiration
        )
        return email
    except (BadSignature, SignatureExpired):
        return None
