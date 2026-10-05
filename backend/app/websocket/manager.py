from fastapi import WebSocket
from typing import Dict, List, Any
import json

class ConnectionManager:
    def __init__(self):
        # room_code -> { client_id: WebSocket }
        self.active_connections: Dict[str, Dict[str, WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_code: str, client_id: str) -> bool:
        if room_code in self.active_connections and len(self.active_connections[room_code]) >= 2:
            await websocket.close(code=4000, reason="Room is full")
            return False

        await websocket.accept()
        if room_code not in self.active_connections:
            self.active_connections[room_code] = {}
        self.active_connections[room_code][client_id] = websocket
        return True

    def disconnect(self, room_code: str, client_id: str):
        if room_code in self.active_connections:
            if client_id in self.active_connections[room_code]:
                del self.active_connections[room_code][client_id]
            if not self.active_connections[room_code]:
                del self.active_connections[room_code]

    async def broadcast_to_room(self, room_code: str, message: dict, sender_id: str = None):
        """Broadcast a message to all clients in a room except the sender"""
        if room_code in self.active_connections:
            for client_id, connection in self.active_connections[room_code].items():
                if sender_id is None or client_id != sender_id:
                    await connection.send_text(json.dumps(message))

    async def send_personal_message(self, message: dict, websocket: WebSocket):
        await websocket.send_text(json.dumps(message))

manager = ConnectionManager()
