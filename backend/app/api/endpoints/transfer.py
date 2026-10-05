from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.transfer import TransferRoom
import secrets
import string
from datetime import datetime, timedelta, timezone

router = APIRouter()

def generate_room_code(length=6):
    """Generate a simple 6-character room code using letters and numbers"""
    alphabet = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

@router.post("/rooms", status_code=201)
def create_room(db: Session = Depends(get_db)):
    # Generate unique room code
    code = generate_room_code()
    # In a real app, you'd ensure it's unique in the DB
    
    expires = datetime.now(timezone.utc) + timedelta(hours=24)
    new_room = TransferRoom(room_code=code, expires_at=expires)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    
    return {"room_code": new_room.room_code, "expires_at": new_room.expires_at}

@router.get("/rooms/{room_code}")
def get_room(room_code: str, db: Session = Depends(get_db)):
    room = db.query(TransferRoom).filter(TransferRoom.room_code == room_code, TransferRoom.is_active == True).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found or expired")
    return {"room_code": room.room_code, "status": "active"}
