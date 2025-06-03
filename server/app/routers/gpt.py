from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.gpt import GPTRequest, GPTResponse
from app.services.gpt_service import generate_summary
from app.utils.mood import extract_category
from app.db.session import get_db
from app.auth.dependencies import get_current_user
from app.models import Entry, User

router = APIRouter()

@router.post("/gpt/summary", response_model=GPTResponse)
def gpt_summary(
    data: GPTRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    print("GPT endpoint called. Current user:", current_user.email)
    summary_data = generate_summary(data.entry_text)

    mood_category = extract_category(summary_data["mood"])

    new_entry = Entry(
        entry_text=data.entry_text,
        summary=summary_data["summary"],
        mood=summary_data["mood"],
        recommendation=summary_data["recommendation"],
        user_id=current_user.id,
        mood_category=mood_category,
    )

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return summary_data
