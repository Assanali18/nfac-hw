import { useState, useCallback } from 'react';

type Conversation = {
    selectedConversation: any | null;
    messages: any[];
};

export const useConversation = () => {
    const [conversation, setConversation] = useState<Conversation>({ selectedConversation: null, messages: [] });

    const setSelectedConversation = useCallback((selectedConversation: any) => {
        setConversation((prevState) => ({ ...prevState, selectedConversation }));
    }, []);

    const setMessages = useCallback((messages: any[]) => {
        setConversation((prevState) => ({ ...prevState, messages }));
    }, []);

    return {
        selectedConversation: conversation.selectedConversation,
        setSelectedConversation,
        messages: conversation.messages,
        setMessages,
    };
};
