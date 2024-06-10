'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import { Post } from '@/types';
import PostCard from '../components/PostCard';

interface NewPost {
    title: string;
    body: string;
    userId: number;
    tags: string[];
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [newPost, setNewPost] = useState<NewPost>({ title: '', body: '', userId: 1, tags: [] });
    const [errors, setErrors] = useState<{ title?: string; body?: string; tags?: string }>({});

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axiosInstance.get('https://dummyjson.com/posts');
            const postsWithUsers = await Promise.all(response.data.posts.map(async (post: Post) => {
                const userResponse = await axiosInstance.get(`https://dummyjson.com/users/${post.userId}`);
                return {
                    ...post,
                    userName: userResponse.data.username
                };
            }));
            setPosts(postsWithUsers);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateFields = () => {
        const newErrors: { title?: string; body?: string; tags?: string } = {};
        if (!newPost.title) newErrors.title = 'Title is required';
        if (!newPost.body) newErrors.body = 'Body is required';
        if (newPost.tags.length === 0 || newPost.tags.some(tag => !tag.trim())) newErrors.tags = 'At least one tag is required and tags cannot be empty';
        return newErrors;
    };

    const handleAddPost = async () => {
        const newErrors = validateFields();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axiosInstance.post('https://dummyjson.com/posts/add', newPost);
            setPosts([...posts, response.data]);
            setNewPost({ title: '', body: '', userId: 1, tags: [] });
            setErrors({});
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleUpdatePost = async (post: Post) => {
        try {
            const response = await axiosInstance.put(`https://dummyjson.com/posts/${post.id}`, {
                title: post.title,
                body: post.body,
                tags: post.tags
            });
            setPosts(posts.map(p => (p.id === post.id ? response.data : p)));
            setEditingPost(null);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDeletePost = async (postId: number) => {
        try {
            await axiosInstance.delete(`https://dummyjson.com/posts/${postId}`);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newTags = [...newPost.tags];
        newTags[index] = e.target.value;
        setNewPost({ ...newPost, tags: newTags });
    };

    const handleAddTag = () => {
        setNewPost({ ...newPost, tags: [...newPost.tags, ''] });
    };

    const handleRemoveTag = (index: number) => {
        const newTags = newPost.tags.filter((_, i) => i !== index);
        setNewPost({ ...newPost, tags: newTags });
    };

    if (loading) return <p>Loading posts...</p>;
    if (posts.length === 0) return <p>No posts found.</p>;

    return (
        <div className="flex flex-wrap justify-center">
            <div className="w-full mb-4 p-4">
                <h2 className="text-2xl font-bold mb-2">Add New Post</h2>
                <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Title"
                    className="mb-2 p-2 border rounded w-full dark:text-black"
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
                <textarea
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    placeholder="Body"
                    className="mb-2 p-2 border rounded w-full dark:text-black"
                />
                {errors.body && <p className="text-red-500">{errors.body}</p>}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Tags</h3>
                    {newPost.tags.map((tag, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={tag}
                                onChange={(e) => handleTagChange(e, index)}
                                placeholder="Tag"
                                className="p-2 border rounded w-full dark:text-black"
                            />
                            <button onClick={() => handleRemoveTag(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                                Remove
                            </button>
                        </div>
                    ))}
                    {errors.tags && <p className="text-red-500">{errors.tags}</p>}
                    <button onClick={handleAddTag} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Add Tag
                    </button>
                </div>
                <button onClick={handleAddPost} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Add Post
                </button>
            </div>
            {posts.map((post) => (
                <div key={post.id} className="w-full mb-4 p-4 border rounded">
                    <PostCard post={post} />
                    <button onClick={() => setEditingPost(post)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                        Edit
                    </button>
                    <button onClick={() => handleDeletePost(post.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2">
                        Delete
                    </button>
                    {editingPost && editingPost.id === post.id && (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold mb-2">Edit Post</h3>
                            <input
                                type="text"
                                value={editingPost.title}
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                placeholder="Title"
                                className="mb-2 p-2 border rounded w-full dark:text-black"
                            />
                            <textarea
                                value={editingPost.body}
                                onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                                placeholder="Body"
                                className="mb-2 p-2 border rounded w-full dark:text-black"
                            />
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                                {editingPost.tags.map((tag, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={tag}
                                            onChange={(e) => {
                                                const newTags = [...editingPost.tags];
                                                newTags[index] = e.target.value;
                                                setEditingPost({ ...editingPost, tags: newTags });
                                            }}
                                            placeholder="Tag"
                                            className="p-2 border rounded w-full dark:text-black"
                                        />
                                        <button onClick={() => {
                                            const newTags = editingPost.tags.filter((_, i) => i !== index);
                                            setEditingPost({ ...editingPost, tags: newTags });
                                        }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button onClick={() => setEditingPost({ ...editingPost, tags: [...editingPost.tags, ''] })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                    Add Tag
                                </button>
                            </div>
                            <button onClick={() => handleUpdatePost(editingPost)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                                Update Post
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
