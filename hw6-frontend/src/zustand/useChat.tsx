import create from "zustand";
import { Conversation, Message } from "@/types";

interface ChatState {
    selectedConversation: Conversation | null;
    setSelectedConversation: (selectedConversation: Conversation) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

const useChat = create<ChatState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: Conversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages: Message[]) => set({ messages }),
}));

export default useChat;
