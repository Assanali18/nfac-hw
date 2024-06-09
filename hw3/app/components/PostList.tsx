"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '@/types';
import PostCard from '../components/PostCard';

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://dummyjson.com/posts')
            .then(async (response) => {
                const postsWithUsers = await Promise.all(response.data.posts.map(async (post: Post) => {
                    const userResponse = await axios.get(`https://dummyjson.com/users/${post.userId}`);
                    return {
                        ...post,
                        userName: userResponse.data.username  // предполагаем, что API возвращает поле username
                    };
                }));
                setPosts(postsWithUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (posts.length === 0) return <p>No posts found.</p>;

    return (
        <div className="flex flex-wrap justify-center">
            {posts.map((post, index) => (
                <PostCard key={post.id} post={post} isLast={index === posts.length - 1} />
            ))}
        </div>
    );
}
