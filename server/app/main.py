from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import status, gpt, entry

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(status.router, prefix="/api")
app.include_router(gpt.router, prefix="/api")
app.include_router(entry.router, prefix="/api")
