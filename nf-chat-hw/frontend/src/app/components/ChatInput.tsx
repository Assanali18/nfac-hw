import React, {useState, useContext, FormEvent, ChangeEvent, useEffect} from 'react';
import { SocketContext } from '../context/SocketContext';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
    roomId: string;
    typingStatus: string;
}

const ChatInput: React.FC<ChatFooterProps> = ({ roomId, typingStatus }) => {
    const [message, setMessage] = useState<string>('');
    const socket = useContext(SocketContext) as Socket;
    const [nowId, setNowId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(()=>{
        const usernameFromStorage = localStorage.getItem("username");
        setUsername(usernameFromStorage);

        const storedId = localStorage.getItem('id');
        setNowId(storedId);
    }, [])

    const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
        socket.emit("typing", { roomId, nowId });
    };

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() && username) {
            socket.emit('send_message', { text: message, roomId, username, messageId: nowId });
            setMessage('');
        }
    };

    return (
        <div className="chat__footer bg-gray-300 p-4 fixed bottom-0 left-0 w-full flex justify-center items-center">

            <form className="form flex w-full max-w-3xl" onSubmit={sendMessage}>

                <input
                    type="text"
                    placeholder="Write message"
                    className="message flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={message}
                    onChange={handleTyping}
                />

                <button type="submit"
                        className="sendBtn bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-300">SEND
                </button>
            </form>
        </div>
    );
}

export default ChatInput;
