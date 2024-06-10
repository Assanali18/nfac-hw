'use client'
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from "@/app/components/ThemeToogle";

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-between items-center py-6 px-4 ">
            <div className="text-black dark:text-white">medium alike</div>
            <div className="flex items-center space-x-4">
                {user && (
                    <button
                        onClick={() => logout()}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                )}
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Header;
