'use client'
'use client';
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`font-bold py-1 px-2 rounded transition-colors ${
                theme === 'light' ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'
            }`}
        >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};

export default ThemeToggle;
