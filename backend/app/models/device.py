from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.session import Base
from sqlalchemy.orm import relationship

class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    device_name = Column(String, nullable=False)
    device_type = Column(String) # Desktop, Mobile, Browser
    os_name = Column(String) # Windows, macOS, Android, iPhone, etc.
    user_id = Column(Integer, ForeignKey("users.id"))
    last_active = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="devices")
