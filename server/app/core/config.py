from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    SECRET_KEY: str
    DATABASE_URL: str

    SMTP_SERVER: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    FRONTEND_URL: str = ""

    SECURITY_PASSWORD_SALT: str = "email-confirm"

    class Config:
        env_file = ".env"

settings = Settings()
