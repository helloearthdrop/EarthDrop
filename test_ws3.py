import asyncio
import websockets
async def test():
    try:
        async with websockets.connect('wss://earthdrop.onrender.com/api/v1/ws/TEST01/desk', origin='https://www.earthdrop.in') as ws1:
            print('Desk connected')
            async with websockets.connect('wss://earthdrop.onrender.com/api/v1/ws/TEST01/mob', origin='https://www.earthdrop.in') as ws2:
                print('Mob connected')
                await ws2.send('{\"type\":\"offer\"}')
                print('Mob sent message')
        print('Both disconnected')
        async with websockets.connect('wss://earthdrop.onrender.com/api/v1/ws/TEST02/mob', origin='https://www.earthdrop.in') as ws3:
            print('Mob reconnected to new room')
    except Exception as e:
        print(f'Error: {e}')
asyncio.run(test())
