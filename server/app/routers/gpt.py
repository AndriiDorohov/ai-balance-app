from fastapi import APIRouter
from app.schemas.gpt import GPTRequest, GPTResponse
from app.services.gpt_service import generate_summary

router = APIRouter()

@router.post("/gpt/summary", response_model=GPTResponse)
def gpt_summary(data: GPTRequest):
    return generate_summary(data.entry_text)
