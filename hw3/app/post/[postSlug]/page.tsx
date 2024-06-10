'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { Post } from '@/types';
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/app/utils/axiosInstance";


const PostPage = () => {
    const [post, setPost] = useState<Post | null>(null);
    const pathname = usePathname();
    const postId = pathname.split('/').pop();

    useEffect(() => {
        if (!postId) return;

        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`https://dummyjson.com/posts/${postId}`, { headers });
                if (response.data) {
                    const post = response.data;
                    if (post.userId) {
                        const userResponse = await axiosInstance.get(`https://dummyjson.com/users/${post.userId}`, { headers });
                        post.userName = userResponse.data.username;
                    }
                    setPost(post);
                }
            } catch (error) {
                console.error('Failed to fetch post or user:', error);
                setPost(null);
            }
        };

        fetchPost();
    }, [postId]);

    if (!post) return <p>Loading post...</p>;

    return (
        <div className="container mx-auto px-4 pb-9">
            <Link href="/" passHref>
                <button className="py-16">
                    <img src='/Left.svg' alt="Back"/>
                </button>
            </Link>
            <div className="max-w-4xl mx-auto pt-24">
                <div className="flex items-center space-x-4 pb-[70px]">
                    <Image src="/ava.png" alt="Author's Image" width={40} height={40} className="rounded-full"/>
                    <div className="flex-grow">
                        <div className="text-lg font-semibold">Author: {post.userName || 'Unknown Author'}</div>
                        <div className="text-gray-500 text-sm">7 July · 12 min read · Member-only</div>
                    </div>
                    <div className="flex space-x-2">
                        <button aria-label="Bookmark">
                            <img src="/actions.svg" alt="Bookmark" className="h-6 w-[100px]"/>
                        </button>
                    </div>
                </div>

                <div className="mb-[70px]">
                    <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
                    <p>How product designers can break from the status quo and help our planet</p>
                </div>

                <img src='https://via.placeholder.com/1024x768' alt={post.title}
                     className="w-full rounded-lg shadow-md mb-[70px]"/>
                <h2 className="text-xl font-semibold mb-6">Subheader</h2>
                <p className=" mb-6">{post.body}</p>
                <div className="flex items-center text-sm text-gray-500">
                    <span>Views: {post.views}</span>
                    <span className="ml-4">Likes: {post.reactions.likes}</span>
                    <span className="ml-4">Dislikes: {post.reactions.dislikes}</span>
                </div>
            </div>
        </div>
    );
};

export default PostPage;
