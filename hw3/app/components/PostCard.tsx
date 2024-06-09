// components/PostCard.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Post } from '@/types';  // Убедитесь, что путь до типов корректен

interface PostCardProps {
    post: Post;
    isLast: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isLast }) => {
    const [userName, setUserName] = useState<string>('');

    return (
        <Link href={`/post/${post.id}`} passHref>
            <div className={`flex flex-row w-full mb-10 ${!isLast ? 'border-b-2 border-gray-200' : ''}`}>
                <div className="flex-1">
                    <p className="text-sm text-gray-500 pb-4">Author: {userName} - 7 July</p>
                    <div className="pr-10">
                        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                        <div className="pt-6">
                            <p className="text-gray-700 text-base">{post.body}</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-9 pt-[70px]">
                        <div className="flex flex-wrap">
                            {post.tags.map(tag => (
                                <span key={tag}
                                      className="bg-gray-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-2xl">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">Views: {post.views}</span>
                        <span className="text-sm text-gray-500 ml-4">Likes: {post.reactions.likes}</span>
                        <span className="text-sm text-gray-500 ml-4">Dislikes: {post.reactions.dislikes}</span>
                    </div>
                </div>
                <div className="w-64 h-64 flex-shrink-0">
                    <img src="https://via.placeholder.com/256" alt={`Image of ${post.title}`}
                         className="w-full h-full object-cover rounded-r-lg"/>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
