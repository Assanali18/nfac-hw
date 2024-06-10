'use client';
import React, { useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import {NewPost} from "@/types";



interface AddPostProps {
    onPostAdded: (post: NewPost) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onPostAdded }) => {
    const [newPost, setNewPost] = useState<NewPost>({ title: '', body: '', userId: 1, tags: [] });
    const [errors, setErrors] = useState<{ title?: string; body?: string; tags?: string }>({});

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
            onPostAdded(response.data);
            setNewPost({ title: '', body: '', userId: 1, tags: [] });
            setErrors({});
        } catch (error) {
            console.error('Error adding post:', error);
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

    return (
        <div className="w-full mb-4 p-4">
            <h2 className="text-2xl font-bold mb-2">Add New Post</h2>
            <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Title"
                className="mb-2 p-2 border rounded w-full"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
            <textarea
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                placeholder="Body"
                className="mb-2 p-2 border rounded w-full"
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
                            className="p-2 border rounded w-full"
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
    );
};

export default AddPost;
