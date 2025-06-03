import smtplib
from email.mime.text import MIMEText
from app.core.config import settings

def send_verification_email(to_email: str, token: str):
    link = f"{settings.FRONTEND_URL}/verify-email?token={token}"
    body = f"Hello! Please verify your email by clicking the link: {link}"

    msg = MIMEText(body)
    msg["Subject"] = "Verify your email"
    msg["From"] = settings.SMTP_USER
    msg["To"] = to_email

    with smtplib.SMTP_SSL(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USER, to_email, msg.as_string())
