from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.sql import func
from app.database.session import Base
from sqlalchemy.orm import relationship

class TransferRoom(Base):
    __tablename__ = "transfer_rooms"

    id = Column(Integer, primary_key=True, index=True)
    room_code = Column(String, unique=True, index=True, nullable=False)
    is_active = Column(Boolean, default=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Anonymous rooms allowed
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="transfer_rooms")
    sessions = relationship("TransferSession", back_populates="room")

class TransferSession(Base):
    __tablename__ = "transfer_sessions"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(Integer, ForeignKey("transfer_rooms.id"))
    sender_device_id = Column(Integer, ForeignKey("devices.id"), nullable=True)
    receiver_device_id = Column(Integer, ForeignKey("devices.id"), nullable=True)
    status = Column(String) # pending, ongoing, completed, failed
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    room = relationship("TransferRoom", back_populates="sessions")
    history = relationship("TransferHistory", back_populates="session")

class TransferHistory(Base):
    __tablename__ = "transfer_history"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("transfer_sessions.id"))
    file_name = Column(String, nullable=False)
    file_size_bytes = Column(Integer)
    file_type = Column(String)
    status = Column(String) # success, failed, cancelled
    transfer_time_seconds = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("TransferSession", back_populates="history")
