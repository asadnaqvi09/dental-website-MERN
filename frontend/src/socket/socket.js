import { io } from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL
    || import.meta.env.VITE_API_URL?.replace('/api/v1', '')
    || 'http://localhost:4000';

export const socket = io(socketUrl, {
    withCredentials: true,
    autoConnect: true,
});
