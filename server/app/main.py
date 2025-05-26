from fastapi import FastAPI
from app.routers import status, gpt

app = FastAPI()

app.include_router(status.router, prefix="/api")
app.include_router(gpt.router, prefix="/api")
