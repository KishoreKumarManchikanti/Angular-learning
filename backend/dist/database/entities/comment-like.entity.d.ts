import { User } from './user.entity';
import { Comment } from './comment.entity';
export declare class CommentLike {
    id: string;
    userId: string;
    user: User;
    commentId: string;
    comment: Comment;
    createdAt: Date;
}
