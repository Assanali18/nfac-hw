'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from "@/app/utils/axiosInstance";

interface User {
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<{ token: string } | null>(null);

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
            alert('Username and password are required');
            return;
        }

        try {
            const response = await axiosInstance.post('auth/login', {
                username,
                password
            });

            const data = response.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                setUser({ token: data.token });
                window.location.href = '/';
            } else {
                throw new Error('Login failed: No token received');
            }
        } catch (error) {
            console.error('Login Error:', error);

        }
    };


    const logout = (): void => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
