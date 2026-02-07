import { User } from './user.entity';
import { Post } from './post.entity';
export declare class PostPin {
    id: string;
    userId: string;
    user: User;
    postId: string;
    post: Post;
    orderIndex: number;
    note: string;
    createdAt: Date;
    updatedAt: Date;
}
