export interface Post{
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
    userName?: string;
}

export interface PostCardProps {
    post: Post;
}