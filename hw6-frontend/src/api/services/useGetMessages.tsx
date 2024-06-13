import { useState, useEffect } from 'react';
import axios from 'axios';
import {Message} from "@/types";
import axiosInstance from "@/api/axiosInstance";


interface UseGetMessagesReturn {
    messages: Message[];
    loading: boolean;
}

export const useGetMessages = (): UseGetMessagesReturn => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get<Message[]>('/api/user');
                setMessages(response.data);
            } catch (error) {
                console.error('Failed to fetch messages', error);
            }
            setLoading(false);
        };

        fetchMessages();
    }, []);

    return { messages, loading };
};
