/**
 * News Feed Database Schema Design
 *
 * Recommended Database: PostgreSQL + Redis
 *
 * Why PostgreSQL?
 * - ACID compliance for data integrity
 * - Complex queries with JOINs for relationships
 * - JSON/JSONB support for flexible data
 * - Full-text search capabilities
 * - Excellent for relational data (users, posts, comments)
 *
 * Why Redis (as secondary)?
 * - Caching frequently accessed data (trending, user feed)
 * - Real-time features (likes count, online status)
 * - Session management
 * - Rate limiting
 * - Pub/Sub for real-time notifications
 *
 * Alternative Options:
 * - MongoDB: If schema flexibility is prioritized
 * - Cassandra: For extremely high write throughput
 * - DynamoDB: For serverless architecture
 */

// ============================================
// USER ENTITY
// ============================================
export interface User {
  id: string; // UUID
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

// ============================================
// POST/NEWS ENTITY
// ============================================
export interface Post {
  id: string; // UUID
  authorId: string; // FK to User
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  category: PostCategory;
  tags: string[];
  visibility: PostVisibility;

  // Denormalized counts (updated via triggers/events)
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  bookmarksCount: number;
  viewsCount: number;

  // Metadata
  isEdited: boolean;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  // For soft delete
  deletedAt?: Date;
}

export enum PostCategory {
  TECHNOLOGY = 'technology',
  SPORTS = 'sports',
  FINANCE = 'finance',
  HEALTH = 'health',
  TRAVEL = 'travel',
  FOOD = 'food',
  SCIENCE = 'science',
  ENTERTAINMENT = 'entertainment',
  POLITICS = 'politics',
  CRYPTO = 'crypto',
  GENERAL = 'general',
}

export enum PostVisibility {
  PUBLIC = 'public',
  FOLLOWERS = 'followers',
  PRIVATE = 'private',
}

// ============================================
// COMMENT ENTITY (Nested/Threaded Comments)
// ============================================
export interface Comment {
  id: string; // UUID
  postId: string; // FK to Post
  authorId: string; // FK to User
  parentId?: string; // FK to Comment (for nested replies)
  content: string;

  // Denormalized counts
  likesCount: number;
  repliesCount: number;

  // Depth level for threading (0 = top level)
  depth: number;

  // For soft delete
  isDeleted: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// USER INTERACTIONS (Like, Save, Pin)
// ============================================
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
  collectionId?: string; // Optional: organize into collections
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

// ============================================
// BOOKMARK COLLECTIONS
// ============================================
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

// ============================================
// USER FOLLOW RELATIONSHIP
// ============================================
export interface UserFollow {
  id: string;
  followerId: string; // User who follows
  followingId: string; // User being followed
  createdAt: Date;
}

// ============================================
// NOTIFICATION ENTITY
// ============================================
export interface Notification {
  id: string;
  userId: string; // Recipient
  type: NotificationType;
  actorId: string; // User who triggered the notification
  entityType: 'post' | 'comment' | 'user';
  entityId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export enum NotificationType {
  LIKE_POST = 'like_post',
  LIKE_COMMENT = 'like_comment',
  COMMENT = 'comment',
  REPLY = 'reply',
  FOLLOW = 'follow',
  MENTION = 'mention',
  SHARE = 'share',
}

// ============================================
// FEED CACHE STRUCTURE (Redis)
// ============================================
export interface UserFeedCache {
  userId: string;
  postIds: string[]; // Ordered list of post IDs
  lastUpdated: Date;
  cursor?: string; // For pagination
}

// ============================================
// TRENDING DATA STRUCTURE (Redis)
// ============================================
export interface TrendingTopic {
  tag: string;
  postsCount: number;
  score: number; // Calculated based on recency and engagement
  updatedAt: Date;
}
