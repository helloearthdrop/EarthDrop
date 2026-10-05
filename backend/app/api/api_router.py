from fastapi import APIRouter

api_router = APIRouter()

# Routes will be included here as they are built
from app.api.endpoints import transfer_ws, transfer
# api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(transfer_ws.router, tags=["transfer-websocket"])
api_router.include_router(transfer.router, prefix="/transfer", tags=["transfer"])
