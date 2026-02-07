import { User } from './user.entity';
import { Comment } from './comment.entity';
import { PostLike } from './post-like.entity';
import { PostPin } from './post-pin.entity';
import { PostSave } from './post-save.entity';
import { Media } from './media.entity';
export declare enum PostCategory {
    TECHNOLOGY = "Technology",
    SPORTS = "Sports",
    FINANCE = "Finance",
    HEALTH = "Health",
    TRAVEL = "Travel",
    FOOD = "Food",
    SCIENCE = "Science",
    ENTERTAINMENT = "Entertainment",
    POLITICS = "Politics",
    CRYPTO = "Crypto",
    GENERAL = "General"
}
export declare enum PostVisibility {
    PUBLIC = "public",
    FOLLOWERS = "followers",
    PRIVATE = "private"
}
export declare enum PostStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
    DELETED = "deleted"
}
export declare class Post {
    id: string;
    authorId: string;
    author: User;
    content: string;
    imageUrl: string | null;
    category: PostCategory;
    visibility: PostVisibility;
    status: PostStatus;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    savesCount: number;
    viewsCount: number;
    engagementScore: number;
    metadata: {
        hashtags?: string[];
        mentions?: string[];
        links?: {
            url: string;
            title?: string;
            preview?: string;
        }[];
        location?: {
            lat: number;
            lng: number;
            name?: string;
        };
        source?: string;
    };
    scheduledAt: Date;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    comments: Comment[];
    likes: PostLike[];
    pins: PostPin[];
    saves: PostSave[];
    media: Media[];
}
