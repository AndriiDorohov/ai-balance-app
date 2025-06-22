from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, status, gpt, entry, goals, user, email

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://52.23.17.247",
        "https://52.23.17.247"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(status.router, prefix="/api")
app.include_router(gpt.router, prefix="/api")
app.include_router(entry.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(goals.router, prefix="/api")
app.include_router(user.router, prefix="/api")
app.include_router(email.router, prefix="/api")
