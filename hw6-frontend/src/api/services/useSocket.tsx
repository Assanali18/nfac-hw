import { useState, useEffect } from 'react';

type SocketHook = {
    onlineUsers: string[];
};

export const useSocket = (socketUrl: string): SocketHook => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        const newSocket = new WebSocket(socketUrl);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'ONLINE_USERS') {
                setOnlineUsers(message.users);
            }
        };

        newSocket.onclose = () => {
            console.log('Socket closed');
        };

        return () => {
            newSocket.close();
        };
    }, [socketUrl]);

    return { onlineUsers };
};
