from fastapi import APIRouter, Depends, HTTPException, Path, Query
from datetime import datetime, time
from typing import List, Optional
from sqlalchemy.orm import Session
from app.schemas.entry import EntryCreate, EntryResponse
from app.db.session import SessionLocal
from app.models.entry import Entry
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.services.gpt_service import generate_summary
from app.utils.mood import extract_category


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/entries", response_model=EntryResponse)
def create_entry(entry: EntryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    today = datetime.utcnow().date()
    existing_entry = db.query(Entry).filter(
        Entry.user_id == current_user.id,
        Entry.created_at >= datetime.combine(today, time.min),
        Entry.created_at <= datetime.combine(today, time.max)
    ).first()

    if existing_entry:
        raise HTTPException(status_code=400, detail="An entry for today already exists.")

    mood_category = extract_category(entry.mood) if entry.mood else "neutral"
    new_entry = Entry(
        entry_text=entry.entry_text,
        summary=entry.summary,
        mood=entry.mood,
        recommendation=entry.recommendation,
        user_id=current_user.id,
        mood_category=mood_category,
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

@router.get("/entries", response_model=List[EntryResponse])
def read_entries(
    sort: str = Query("desc", enum=["asc", "desc"]),
    skip: int = 0,
    limit: int = 10,
    mood_category: Optional[str] = None,
    start: Optional[datetime] = None,
    end: Optional[datetime] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    order = Entry.created_at.desc() if sort == "desc" else Entry.created_at.asc()

    query = db.query(Entry).filter(Entry.user_id == current_user.id)

    if mood_category and mood_category != "all":
        query = query.filter(Entry.mood_category == mood_category)
    if start:
        query = query.filter(Entry.created_at >= start)
    if end:
        query = query.filter(Entry.created_at <= end)

    result = query.order_by(order).offset(skip).limit(limit).all()

    print(f"read_entries called with skip={skip}, limit={limit}")
    print(f"Returning {len(result)} entries")

    return result



@router.put("/entries/{entry_id}", response_model=EntryResponse)
def update_entry(
    entry_id: int,
    entry_data: EntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    entry = db.query(Entry).filter(Entry.id == entry_id).first()

    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    if entry.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this entry")

    gpt_result = generate_summary(entry_data.entry_text)

    entry.entry_text = entry_data.entry_text
    entry.summary = gpt_result["summary"]
    entry.mood = gpt_result["mood"]
    entry.recommendation = gpt_result["recommendation"]
    entry.mood_category = extract_category(gpt_result["mood"])

    db.commit()
    db.refresh(entry)
    return entry

@router.delete("/entries/{entry_id}", status_code=204)
def delete_entry(
    entry_id: int = Path(..., gt=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    entry = db.query(Entry).filter(Entry.id == entry_id).first()

    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    if entry.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this entry")

    db.delete(entry)
    db.commit()
    return

@router.get("/entries/today", response_model=EntryResponse)
def get_today_entry(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    today = datetime.utcnow().date()
    entry = db.query(Entry).filter(
        Entry.user_id == current_user.id,
        Entry.created_at >= datetime.combine(today, time.min),
        Entry.created_at <= datetime.combine(today, time.max)
    ).first()
    if not entry:
        raise HTTPException(status_code=404, detail="No entry for today")
    return entry

@router.post("/entries/{entry_id}/regenerate", response_model=EntryResponse)
def regenerate_entry(
    entry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    entry = db.query(Entry).filter(Entry.id == entry_id).first()

    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    if entry.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    gpt_result = generate_summary(entry.entry_text)

    entry.summary = gpt_result["summary"]
    entry.mood = gpt_result["mood"]
    entry.recommendation = gpt_result["recommendation"]
    entry.mood_category = extract_category(gpt_result["mood"])

    db.commit()
    db.refresh(entry)
    return entry

@router.get("/entries/all", response_model=List[EntryResponse])
def get_all_entries(
    sort: str = Query("desc", enum=["asc", "desc"]),
    mood_category: Optional[str] = None,
    start: Optional[datetime] = None,
    end: Optional[datetime] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    order = Entry.created_at.desc() if sort == "desc" else Entry.created_at.asc()

    query = db.query(Entry).filter(Entry.user_id == current_user.id)

    if mood_category and mood_category != "all":
        query = query.filter(Entry.mood_category == mood_category)

    if start:
        query = query.filter(Entry.created_at >= start)
    if end:
        query = query.filter(Entry.created_at <= end)

    return query.order_by(order).all()
