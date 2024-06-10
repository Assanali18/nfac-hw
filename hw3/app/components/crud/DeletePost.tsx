'use client';
import React from 'react';
import axiosInstance from '@/app/utils/axiosInstance';

interface DeletePostProps {
    postId: number;
    onPostDeleted: (postId: number) => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ postId, onPostDeleted }) => {
    const handleDeletePost = async () => {
        try {
            await axiosInstance.delete(`https://dummyjson.com/posts/${postId}`);
            onPostDeleted(postId);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <button onClick={handleDeletePost} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2">
            Delete
        </button>
    );
};

export default DeletePost;
