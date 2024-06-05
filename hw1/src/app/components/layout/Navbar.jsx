"use client";
import { useState } from 'react';
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <Link href="/" className="font-bold text-xl">
                Blog Apps
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 lg:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <nav className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col lg:flex-row lg:items-center lg:flex`}>
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
