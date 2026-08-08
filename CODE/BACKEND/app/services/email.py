import smtplib
from email.mime.text import MIMEText

from app.config import settings


def send_reset_email(to_email: str, reset_link: str) -> None:
    subject = "Reset your ABES Autonomy password"
    body = (
        f"You requested a password reset.\n\n"
        f"Click the link below to set a new password (valid for 30 minutes):\n"
        f"{reset_link}\n\n"
        f"If you did not request this, ignore this email."
    )

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = settings.SMTP_FROM
    msg["To"] = to_email

    if not settings.SMTP_HOST:
        # No SMTP configured (dev mode) — log instead of sending
        print(f"[DEV EMAIL] To: {to_email}\n{body}")
        return

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_FROM, [to_email], msg.as_string())