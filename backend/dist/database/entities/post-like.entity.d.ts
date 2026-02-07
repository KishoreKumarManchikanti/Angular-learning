import { User } from './user.entity';
import { Post } from './post.entity';
export declare class PostLike {
    id: string;
    userId: string;
    user: User;
    postId: string;
    post: Post;
    createdAt: Date;
}
