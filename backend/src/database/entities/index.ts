// Core Entities
export * from './user.entity';
export * from './post.entity';
export * from './comment.entity';
export * from './media.entity';

// Interaction Entities
export * from './post-like.entity';
export * from './post-pin.entity';
export * from './post-save.entity';
export * from './comment-like.entity';
export * from './user-follow.entity';

// Analytics Entities
export * from './analytics/user-session.entity';
export * from './analytics/page-view.entity';
export * from './analytics/post-engagement.entity';
export * from './analytics/user-activity.entity';
export * from './analytics/daily-stats.entity';
export * from './analytics/trending-metrics.entity';

// Entity array for TypeORM
import { User } from './user.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Media } from './media.entity';
import { PostLike } from './post-like.entity';
import { PostPin } from './post-pin.entity';
import { PostSave } from './post-save.entity';
import { CommentLike } from './comment-like.entity';
import { UserFollow } from './user-follow.entity';
import { UserSession } from './analytics/user-session.entity';
import { PageView } from './analytics/page-view.entity';
import { PostEngagement } from './analytics/post-engagement.entity';
import { UserActivity } from './analytics/user-activity.entity';
import { DailyStats } from './analytics/daily-stats.entity';
import { TrendingMetrics } from './analytics/trending-metrics.entity';

export const entities = [
  // Core
  User,
  Post,
  Comment,
  Media,
  // Interactions
  PostLike,
  PostPin,
  PostSave,
  CommentLike,
  UserFollow,
  // Analytics
  UserSession,
  PageView,
  PostEngagement,
  UserActivity,
  DailyStats,
  TrendingMetrics,
];
