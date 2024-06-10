'use client'
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        console.log(username, password);
        await login(username, password);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 max-w-sm w-full shadow-md rounded-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="username">Username</label>
                        <input type="text" id="username" className="bg-white w-full p-2 border border-gray-300 rounded shadow-sm"
                               value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="password">Password</label>
                        <input type="password" id="password" className="bg-white w-full p-2 border border-gray-300 rounded shadow-sm"
                               value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
