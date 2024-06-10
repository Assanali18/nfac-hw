import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
    post: Post;
    isLast?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isLast }) => {
    return (
        <Link href={`/post/${post.id}`} passHref>
            <div className={`flex flex-row w-full mb-10 ${!isLast ? 'border-b-2 border-gray-200' : ''}`}>
                <div className="flex-1">
                    <p className="text-sm  pb-4">Author: {post.userName || 'Unknown'} - 7 July</p>
                    <div className="pr-10">
                        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                        <div className="pt-6">
                            <p className=" text-base">{post.body}</p>
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
                        <span className="text-sm text-gray-500">12 min read</span>
                        <span className="text-sm text-gray-500 ml-4">Selected for you</span>
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
