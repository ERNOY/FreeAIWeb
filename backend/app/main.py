
from fastapi import FastAPI
from .routes import router

app = FastAPI(title="FreeAIWeb API")

app.include_router(router)
