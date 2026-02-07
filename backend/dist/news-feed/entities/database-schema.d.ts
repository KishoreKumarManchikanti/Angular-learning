export interface User {
    id: string;
    username: string;
    email: string;
    displayName: string;
    avatar: string;
    bio?: string;
    isVerified: boolean;
    followersCount: number;
    followingCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface Post {
    id: string;
    authorId: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    category: PostCategory;
    tags: string[];
    visibility: PostVisibility;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    bookmarksCount: number;
    viewsCount: number;
    isEdited: boolean;
    editedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export declare enum PostCategory {
    TECHNOLOGY = "technology",
    SPORTS = "sports",
    FINANCE = "finance",
    HEALTH = "health",
    TRAVEL = "travel",
    FOOD = "food",
    SCIENCE = "science",
    ENTERTAINMENT = "entertainment",
    POLITICS = "politics",
    CRYPTO = "crypto",
    GENERAL = "general"
}
export declare enum PostVisibility {
    PUBLIC = "public",
    FOLLOWERS = "followers",
    PRIVATE = "private"
}
export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    parentId?: string;
    content: string;
    likesCount: number;
    repliesCount: number;
    depth: number;
    isDeleted: boolean;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface PostLike {
    id: string;
    userId: string;
    postId: string;
    createdAt: Date;
}
export interface PostBookmark {
    id: string;
    userId: string;
    postId: string;
    collectionId?: string;
    createdAt: Date;
}
export interface PostPin {
    id: string;
    userId: string;
    postId: string;
    pinnedAt: Date;
}
export interface CommentLike {
    id: string;
    userId: string;
    commentId: string;
    createdAt: Date;
}
export interface BookmarkCollection {
    id: string;
    userId: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    itemCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserFollow {
    id: string;
    followerId: string;
    followingId: string;
    createdAt: Date;
}
export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    actorId: string;
    entityType: 'post' | 'comment' | 'user';
    entityId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}
export declare enum NotificationType {
    LIKE_POST = "like_post",
    LIKE_COMMENT = "like_comment",
    COMMENT = "comment",
    REPLY = "reply",
    FOLLOW = "follow",
    MENTION = "mention",
    SHARE = "share"
}
export interface UserFeedCache {
    userId: string;
    postIds: string[];
    lastUpdated: Date;
    cursor?: string;
}
export interface TrendingTopic {
    tag: string;
    postsCount: number;
    score: number;
    updatedAt: Date;
}
