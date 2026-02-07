import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { PostLike } from './post-like.entity';
import { PostPin } from './post-pin.entity';
import { PostSave } from './post-save.entity';
import { CommentLike } from './comment-like.entity';
import { UserFollow } from './user-follow.entity';
export declare enum UserRole {
    USER = "user",
    MODERATOR = "moderator",
    ADMIN = "admin",
    VERIFIED_CREATOR = "verified_creator"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    BANNED = "banned"
}
export declare class User {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    coverImageUrl: string;
    isVerified: boolean;
    role: UserRole;
    status: UserStatus;
    location: string;
    website: string;
    dateOfBirth: Date;
    followersCount: number;
    followingCount: number;
    postsCount: number;
    lastLoginAt: Date;
    lastActiveAt: Date;
    totalLoginCount: number;
    emailVerified: boolean;
    emailVerifiedAt: Date;
    preferences: {
        theme?: 'light' | 'dark' | 'system';
        language?: string;
        timezone?: string;
        notifications?: {
            email?: boolean;
            push?: boolean;
            likes?: boolean;
            comments?: boolean;
            follows?: boolean;
            mentions?: boolean;
        };
        privacy?: {
            showEmail?: boolean;
            showLocation?: boolean;
            allowTagging?: boolean;
            allowDM?: boolean;
        };
        feed?: {
            defaultCategory?: string;
            autoplayVideos?: boolean;
            showNSFW?: boolean;
        };
    };
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    posts: Post[];
    comments: Comment[];
    postLikes: PostLike[];
    postPins: PostPin[];
    postSaves: PostSave[];
    commentLikes: CommentLike[];
    following: UserFollow[];
    followers: UserFollow[];
}
