import asyncio
import websockets
async def test():
    try:
        async with websockets.connect('wss://earthdrop.onrender.com/api/v1/ws/DI905U/123', origin='https://www.earthdrop.in') as ws1:
            print('C1 connected')
            async with websockets.connect('wss://earthdrop.onrender.com/api/v1/ws/DI905U/456', origin='https://www.earthdrop.in') as ws2:
                print('C2 connected')
                async with websockets.connect('wss://earthdrop.onrender.com/api/v1/ws/DI905U/789', origin='https://www.earthdrop.in') as ws3:
                    print('C3 connected')
    except Exception as e:
        print(f'Error: {e}')
asyncio.run(test())
