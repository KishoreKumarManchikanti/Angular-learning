import { PostCategory, PostVisibility } from '../../database/entities/post.entity';
export declare class CreatePostDto {
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    category: PostCategory;
    tags?: string[];
    visibility?: PostVisibility;
}
export declare class UpdatePostDto {
    content?: string;
    imageUrl?: string;
    videoUrl?: string;
    category?: PostCategory;
    tags?: string[];
    visibility?: PostVisibility;
}
export declare class CreateCommentDto {
    postId: string;
    parentId?: string;
    content: string;
}
export declare class UpdateCommentDto {
    content: string;
}
export declare class GetFeedQueryDto {
    page?: number;
    limit?: number;
    category?: PostCategory;
    cursor?: string;
}
export declare class GetCommentsQueryDto {
    postId: string;
    page?: number;
    limit?: number;
    sortBy?: 'newest' | 'oldest' | 'popular';
    parentId?: string;
}
export declare class CreateBookmarkCollectionDto {
    name: string;
    description?: string;
    isPrivate?: boolean;
}
export declare class AuthorDto {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isVerified: boolean;
}
export declare class PostResponseDto {
    id: string;
    author: AuthorDto;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    category: PostCategory;
    tags: string[];
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    bookmarksCount: number;
    isLiked: boolean;
    isPinned: boolean;
    isSaved: boolean;
    createdAt: Date;
    updatedAt: Date;
    timeAgo: string;
}
export declare class CommentResponseDto {
    id: string;
    postId: string;
    author: AuthorDto;
    parentId?: string;
    content: string;
    likesCount: number;
    repliesCount: number;
    replies?: CommentResponseDto[];
    isLiked: boolean;
    isAuthor: boolean;
    depth: number;
    createdAt: Date;
    timeAgo: string;
}
export declare class PaginatedResponseDto<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
        nextCursor?: string;
    };
}
export declare class UserInteractionsDto {
    liked: GroupedInteractionsDto[];
    pinned: GroupedInteractionsDto[];
    saved: GroupedInteractionsDto[];
}
export declare class GroupedInteractionsDto {
    category: PostCategory;
    items: InteractionItemDto[];
    count: number;
}
export declare class InteractionItemDto {
    id: string;
    postId: string;
    title: string;
    preview: string;
    category: PostCategory;
    timeAgo: string;
    createdAt: Date;
}
export declare class TrendingTopicDto {
    rank: number;
    tag: string;
    postsCount: number;
    formattedCount: string;
}
export declare class RecentActivityItemDto {
    id: string;
    type: 'comment' | 'reply' | 'like' | 'save';
    postId: string;
    postPreview: string;
    postAuthor: AuthorDto;
    isOwnPost: boolean;
    comment?: {
        id: string;
        content: string;
        likesCount: number;
        repliesCount: number;
    };
    timeAgo: string;
    createdAt: Date;
}
export declare class RecentActivityDto {
    commentsOnOthersPosts: RecentActivityItemDto[];
    commentsOnOwnPosts: RecentActivityItemDto[];
    recentRepliesReceived: RecentActivityItemDto[];
    totalCount: number;
}
export declare class ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    meta?: {
        timestamp: Date;
        requestId: string;
    };
}
