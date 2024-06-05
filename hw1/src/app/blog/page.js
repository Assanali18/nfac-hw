import Link from 'next/link';
import data from '../../data/data.json';
import Head from "next/head";

export default function Blog() {
    return (
        <div className="container mx-auto p-4">
            <Head>
                <title>Blog Posts | My Blog</title>
                <meta name="description" content="List of blog posts"/>
                <meta name="keywords" content="blog, posts, articles"/>
                <meta name="author" content="Your Name"/>
            </Head>
            <h1 className="text-3xl font-bold mb-4">Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map(post => (
                    <div key={post.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                        <Link href={`/blog/${encodeURIComponent(post.slug)}`}
                              className="text-xl font-semibold text-blue-500 hover:underline">
                            {post.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-2">by {post.author}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
