"use client";
import { useState } from 'react';
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="relative flex items-center justify-between border-b border-gray-200 p-4">
            <Link href="/" className="font-bold text-xl">
                Blog Apps
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 lg:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <div className={`${isMenuOpen ? 'absolute' : 'hidden'} top-16 right-0 z-20 bg-white w-48 h-auto shadow-lg lg:hidden`}>
                <nav className="flex flex-col items-start">
                    <Link href="/" className="px-6 py-2 w-full text-left hover:bg-gray-100" onClick={closeMenu}>
                        Home
                    </Link>
                    <Link href="/about" className="px-6 py-2 w-full text-left hover:bg-gray-100" onClick={closeMenu}>
                        About
                    </Link>
                    <Link href="/blog" className="px-6 py-2 w-full text-left hover:bg-gray-100" onClick={closeMenu}>
                        Blog
                    </Link>
                </nav>
            </div>
            <nav className="hidden lg:flex lg:items-center lg:space-x-4">
                <Link href="/" className="px-6 py-2 hover:text-indigo-500">
                    Home
                </Link>
                <Link href="/about" className="px-6 py-2 hover:text-indigo-500">
                    About
                </Link>
                <Link href="/blog" className="px-6 py-2 hover:text-indigo-500">
                    Blog
                </Link>
            </nav>
        </div>
    );
}
