import asyncio
import websockets
async def test():
    try:
        async with websockets.connect('wss://earthdrop.onrender.com/api/v1/ws/ABCDEF/1234', origin='https://www.earthdrop.in') as ws:
            print('Connected with Origin!')
    except Exception as e:
        print(f'Error: {e}')
asyncio.run(test())
