import { User } from './user.entity';
import { Post } from './post.entity';
import { CommentLike } from './comment-like.entity';
export declare class Comment {
    id: string;
    postId: string;
    post: Post;
    authorId: string;
    author: User;
    parentId: string | null;
    parent: Comment;
    replies: Comment[];
    content: string;
    depth: number;
    likesCount: number;
    repliesCount: number;
    isEdited: boolean;
    editedAt: Date;
    isDeleted: boolean;
    metadata: {
        mentions?: string[];
        editHistory?: {
            content: string;
            editedAt: Date;
        }[];
    };
    createdAt: Date;
    updatedAt: Date;
    likes: CommentLike[];
}
