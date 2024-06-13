'use client'
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import {Conversation} from "@/types";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get("/api/user");
                const data = await res.data;
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error:any) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};
export default useGetConversations;