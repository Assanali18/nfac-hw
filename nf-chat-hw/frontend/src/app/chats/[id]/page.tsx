'use client'

import { useEffect, useState } from "react";
import ChatBody from "../../components/ChatBody";
import ChatInput from "../../components/ChatInput";
import { useRouter, usePathname } from "next/navigation";
import { useSocket } from "../../context/SocketContext";

const ChatPage = () => {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const id1 = segments[segments.length - 1];

    const [id2, setId2] = useState<string | null>(null);
    const [roomId, setRoomId] = useState<string>('');
    
    const socket = useSocket();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedId = localStorage.getItem('id');
            setId2(storedId);

            if (id1 && storedId) {
                const roomId = [id1, storedId].sort().join('-');
                setRoomId(roomId);
            }
        }
    }, [id1]);

    useEffect(() => {
        if (socket && roomId) {
          socket.emit('join_room', roomId);
        }
      }, [socket, roomId]);
    
    return (
        <>
        <div className="chat">
        <div className="chat__main">
            <ChatBody />
            {roomId && <ChatInput roomId={roomId}/>}
        </div>
        </div>
        </>
    )
};

export default ChatPage;