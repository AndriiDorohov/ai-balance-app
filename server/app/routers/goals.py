from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.goal import Goal
from app.models.user import User
from app.schemas.goal import GoalCreate, GoalResponse
from app.auth.dependencies import get_current_user
from app.services.gpt_service import analyze_goal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/goals", response_model=GoalResponse)
def create_goal(goal_data: GoalCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    summary = analyze_goal(goal_data.text)
    goal = Goal(
        user_id=current_user.id,
        text=goal_data.text,
        summary=summary
    )
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal

@router.get("/goals", response_model=list[GoalResponse])
def get_goals(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Goal).filter(Goal.user_id == current_user.id).order_by(Goal.created_at.desc()).all()

@router.patch("/goals/{goal_id}", response_model=GoalResponse)
def toggle_goal(goal_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    goal.completed = not goal.completed
    db.commit()
    db.refresh(goal)
    return goal

@router.delete("/goals/{goal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_goal(goal_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    db.delete(goal)
    db.commit()
    return
