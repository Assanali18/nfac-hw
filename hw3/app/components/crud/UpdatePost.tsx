'use client';
import React, { useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import { Post } from '@/types';

interface UpdatePostProps {
    post: Post;
    onPostUpdated: (post: Post) => void;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ post, onPostUpdated }) => {
    const [editingPost, setEditingPost] = useState<Post>(post);

    const handleUpdatePost = async () => {
        try {
            const response = await axiosInstance.put(`https://dummyjson.com/posts/${editingPost.id}`, {
                title: editingPost.title,
                body: editingPost.body,
                tags: editingPost.tags
            });
            onPostUpdated(response.data);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newTags = [...editingPost.tags];
        newTags[index] = e.target.value;
        setEditingPost({ ...editingPost, tags: newTags });
    };

    const handleAddTag = () => {
        setEditingPost({ ...editingPost, tags: [...editingPost.tags, ''] });
    };

    const handleRemoveTag = (index: number) => {
        const newTags = editingPost.tags.filter((_, i) => i !== index);
        setEditingPost({ ...editingPost, tags: newTags });
    };

    return (
        <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Edit Post</h3>
            <input
                type="text"
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                placeholder="Title"
                className="mb-2 p-2 border rounded w-full"
            />
            <textarea
                value={editingPost.body}
                onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                placeholder="Body"
                className="mb-2 p-2 border rounded w-full"
            />
            <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                {editingPost.tags.map((tag, index) => (
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
                <button onClick={handleAddTag} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    Add Tag
                </button>
            </div>
            <button onClick={handleUpdatePost} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                Update Post
            </button>
        </div>
    );
};

export default UpdatePost;
