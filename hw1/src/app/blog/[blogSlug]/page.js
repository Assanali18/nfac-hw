"use client";

import { usePathname } from 'next/navigation';
import Head from 'next/head';
import data from '../../../data/data.json';


export default function BlogPage() {
    const pathname = usePathname();
    const slug = decodeURIComponent(pathname.split('/').pop());
    const post = data.find(p => p.slug === slug);


    if (!post) return <p className="text-red-500 text-center mt-4">Post not found</p>;

    return (
        <div className="container mx-auto p-4">
            <Head>
                <title>{post.title} | My Blog</title>
                <meta name="description" content={post.description}/>
                <meta name="keywords" content={`${post.title}, blog`}/>
                <meta name="author" content={post.author}/>
            </Head>
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <h2 className="text-xl text-gray-700 mb-4">By {post.author}</h2>
            <p className="text-base text-gray-800">{post.description}</p>
        </div>
    );
}
