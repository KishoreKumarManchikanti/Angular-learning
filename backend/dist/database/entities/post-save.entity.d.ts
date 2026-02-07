import { User } from './user.entity';
import { Post } from './post.entity';
export declare class PostSave {
    id: string;
    userId: string;
    user: User;
    postId: string;
    post: Post;
    collectionName: string;
    createdAt: Date;
}
