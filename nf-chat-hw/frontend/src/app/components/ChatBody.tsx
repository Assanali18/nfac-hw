import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Socket } from 'socket.io-client';
import OnlineStatus from './OnlineStatus';
import ChatInput from './ChatInput';

interface Message {
  username: string;
  text: string;
  _id?: string;
  messageId: string;
  roomId: string;
}

interface User {
  _id: string;
  username: string;
}

const ChatBody: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  const [chatPartnerName, setChatPartnerName] = useState<string>('Loading...');
  const socket = useContext(SocketContext) as Socket;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedId = localStorage.getItem('id');
      setUserId(storedId);
      if (storedId) {
        const roomPath = window.location.pathname.split('/');
        const partnerId = roomPath[roomPath.length - 1];
        const roomId = [partnerId, storedId].sort().join('-');
        setRoomId(roomId);
        fetchUser(partnerId);
      }
    }
  }, []);

  const fetchUser = async (userId: string) => {
    try {
      const response = await fetch(`https://nfac-hw-production-09a4.up.railway.app/api/v1/users/${userId}`);
      const data: User = await response.json();
      if (data.username) {
        setChatPartnerName(data.username);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (roomId) {
        const response = await fetch(`https://nfac-hw-production-09a4.up.railway.app/api/v1/messages/${roomId}`);
        const data = await response.json();
        setMessages(data);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {

      setMessages(prev => [...prev, message]);
    };

    if (socket) {
      socket.on('receive_message', handleReceiveMessage);

      socket.on("user_typing", () => {
        setTypingStatus(`User is typing...`);
        setTimeout(() => setTypingStatus(''), 3000);
      });

      return () => {
        socket.off('receive_message', handleReceiveMessage);
        socket.off("user_typing");
      };
    }

  }, [socket]);

  return (
      <>
        <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-10">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <p className="text-xl font-bold">Chat with {chatPartnerName}</p>
            {userId && <OnlineStatus userId={userId} />}
          </div>
        </header>
        <div className="pt-16 pb-20">
          <div className="bg-gray-200 p-4 overflow-y-auto  space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`message__chats ${message.messageId === userId ? 'message__sender' : 'message__recipient'} p-3 rounded-md`}>
                  <p className=" font-semibold">{message.username}</p>
                  <p className="text-gray-800">{message.text}</p>
                </div>
            ))}
          </div>
        </div>
      </>
  );
};

export default ChatBody;
