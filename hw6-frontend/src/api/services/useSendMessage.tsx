import { useConversation } from "@/api/services/useConversation";
import { useState } from "react";
import {Message} from "@/types";


interface SendMessageResponse {
    error?: string;
    message?: Message;
}

const useSendMessage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (messageText: string): Promise<void> => {
        setLoading(true);
        try {
            console.log(selectedConversation)
            const res = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: messageText }),
            });
            const data: SendMessageResponse = await res.json();
            if (data.error) throw new Error(data.error);
            if (data.message) setMessages([...messages, data.message]);

        } catch (error: any) {
            console.error("Sending message failed:", error.message); // Пример логирования ошибки
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
