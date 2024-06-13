'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useRouter } from 'next/navigation';
interface User {
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState< User  | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        } else {
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
        if (!username || !password) {
            alert('username and password are required');
            return;
        }

        try {
            const response = await axiosInstance.post('api/v1/login', { 
                username,
                password
            });

            const data = response.data;
            console.log(data)
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('id', data.user._id);
                
                setUser({ token: data.token });
                window.location.href = '/';
            } else {
                throw new Error('Login failed: No token received');
            }
        } catch (error) {
            console.error('Login Error:', error);

        }
    };

    const register = async (username: string, password: string): Promise<void> => {
        try {
            const response = await axiosInstance.post('api/v1/register', {username,  password });
            console.log(response);
            window.location.href = '/login';
        } catch (error) {
            console.error('Register failed:', error);
            alert('Register failed!');
        }
    };


    const logout = (): void => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};