import PostList from "@/app/components/PostList";

export default function Home() {
    return (
            <div className="container">
                <div className="flex flex-wrap pt">
                    <div className="w-full">
                        <div className="py-16">
                            <h1 className="text-4xl text-black font-bold dark:text-white">Hello, world!</h1>
                        </div>
                        <PostList/>
                    </div>
                </div>
            </div>
    );
}
