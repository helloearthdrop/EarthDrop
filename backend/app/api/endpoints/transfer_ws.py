from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.manager import manager
import json

router = APIRouter()

@router.websocket("/ws/{room_code}/{client_id}")
async def websocket_endpoint(websocket: WebSocket, room_code: str, client_id: str):
    success = await manager.connect(websocket, room_code, client_id)
    if not success:
        return
    
    # Notify others in the room that a new user joined
    await manager.broadcast_to_room(
        room_code, 
        {"type": "peer-joined", "client_id": client_id},
        sender_id=client_id
    )

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Message routing for WebRTC signaling (offer, answer, ice-candidate)
            # The payload must contain the target client_id to route appropriately
            target_id = message.get("target")
            
            if target_id and room_code in manager.active_connections:
                if target_id in manager.active_connections[room_code]:
                    target_ws = manager.active_connections[room_code][target_id]
                    # Append sender_id so the target knows who sent it
                    message["sender"] = client_id
                    await manager.send_personal_message(message, target_ws)
            else:
                # If no specific target, broadcast to everyone else
                message["sender"] = client_id
                await manager.broadcast_to_room(room_code, message, sender_id=client_id)

    except WebSocketDisconnect:
        manager.disconnect(room_code, client_id)
        await manager.broadcast_to_room(
            room_code,
            {"type": "peer-left", "client_id": client_id}
        )
