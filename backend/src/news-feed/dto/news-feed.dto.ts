import { PostCategory, PostVisibility } from '../../database/entities/post.entity';

// ============================================
// REQUEST DTOs
// ============================================

export class CreatePostDto {
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  category: PostCategory;
  tags?: string[];
  visibility?: PostVisibility;
}

export class UpdatePostDto {
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  category?: PostCategory;
  tags?: string[];
  visibility?: PostVisibility;
}

export class CreateCommentDto {
  postId: string;
  parentId?: string; // For replies
  content: string;
}

export class UpdateCommentDto {
  content: string;
}

export class GetFeedQueryDto {
  page?: number;
  limit?: number;
  category?: PostCategory;
  cursor?: string; // For cursor-based pagination
}

export class GetCommentsQueryDto {
  postId: string;
  page?: number;
  limit?: number;
  sortBy?: 'newest' | 'oldest' | 'popular';
  parentId?: string; // Get replies for specific comment
}

export class CreateBookmarkCollectionDto {
  name: string;
  description?: string;
  isPrivate?: boolean;
}

// ============================================
// RESPONSE DTOs
// ============================================

export class AuthorDto {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
}

export class PostResponseDto {
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

  // Current user's interaction status
  isLiked: boolean;
  isPinned: boolean;
  isSaved: boolean;

  createdAt: Date;
  updatedAt: Date;
  timeAgo: string;
}

export class CommentResponseDto {
  id: string;
  postId: string;
  author: AuthorDto;
  parentId?: string;
  content: string;

  likesCount: number;
  repliesCount: number;
  replies?: CommentResponseDto[]; // Nested replies (limited depth)

  // Current user's interaction
  isLiked: boolean;
  isAuthor: boolean; // If current user is the author

  depth: number;
  createdAt: Date;
  timeAgo: string;
}

export class PaginatedResponseDto<T> {
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

export class UserInteractionsDto {
  liked: GroupedInteractionsDto[];
  pinned: GroupedInteractionsDto[];
  saved: GroupedInteractionsDto[];
}

export class GroupedInteractionsDto {
  category: PostCategory;
  items: InteractionItemDto[];
  count: number;
}

export class InteractionItemDto {
  id: string;
  postId: string;
  title: string;
  preview: string;
  category: PostCategory;
  timeAgo: string;
  createdAt: Date;
}

export class TrendingTopicDto {
  rank: number;
  tag: string;
  postsCount: number;
  formattedCount: string;
}

// ============================================
// RECENT ACTIVITY DTOs
// ============================================

export class RecentActivityItemDto {
  id: string;
  type: 'comment' | 'reply' | 'like' | 'save';
  postId: string;
  postPreview: string;
  postAuthor: AuthorDto;
  isOwnPost: boolean; // Whether it's the user's own post
  comment?: {
    id: string;
    content: string;
    likesCount: number;
    repliesCount: number;
  };
  timeAgo: string;
  createdAt: Date;
}

export class RecentActivityDto {
  commentsOnOthersPosts: RecentActivityItemDto[];
  commentsOnOwnPosts: RecentActivityItemDto[];
  recentRepliesReceived: RecentActivityItemDto[];
  totalCount: number;
}

// ============================================
// API Response Wrapper
// ============================================

export class ApiResponse<T> {
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
