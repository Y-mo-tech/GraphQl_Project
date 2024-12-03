import { io as Client } from 'socket.io-client';

export const createWebSocketClient = (jwtToken: string) => {
    console.log("==========Inside createWebSocketClient fxn===========")
    const socket = Client('http://localhost:8000', {
        auth: { token: jwtToken },
    });

    socket.on('connect', () => {
        console.log('WebSocket client connected');
    });

    socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
    });

    // socket.on("userJoined", (data) => {
    //     console.log("Message received from server:", data);
    // });

    return socket;
};
