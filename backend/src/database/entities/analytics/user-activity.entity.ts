import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../user.entity';

export enum ActivityActionType {
  // Post actions
  POST_CREATE = 'post_create',
  POST_EDIT = 'post_edit',
  POST_DELETE = 'post_delete',
  POST_VIEW = 'post_view',
  POST_LIKE = 'post_like',
  POST_UNLIKE = 'post_unlike',
  POST_SHARE = 'post_share',
  POST_SAVE = 'post_save',
  POST_UNSAVE = 'post_unsave',
  POST_PIN = 'post_pin',
  POST_UNPIN = 'post_unpin',
  POST_REPORT = 'post_report',

  // Comment actions
  COMMENT_CREATE = 'comment_create',
  COMMENT_EDIT = 'comment_edit',
  COMMENT_DELETE = 'comment_delete',
  COMMENT_LIKE = 'comment_like',
  COMMENT_UNLIKE = 'comment_unlike',
  COMMENT_REPLY = 'comment_reply',

  // User actions
  USER_FOLLOW = 'user_follow',
  USER_UNFOLLOW = 'user_unfollow',
  USER_BLOCK = 'user_block',
  USER_UNBLOCK = 'user_unblock',
  PROFILE_VIEW = 'profile_view',
  PROFILE_EDIT = 'profile_edit',

  // Media actions
  MEDIA_UPLOAD = 'media_upload',
  MEDIA_VIEW = 'media_view',
  VIDEO_PLAY = 'video_play',
  VIDEO_COMPLETE = 'video_complete',

  // Auth actions
  LOGIN = 'login',
  LOGOUT = 'logout',
  PASSWORD_CHANGE = 'password_change',

  // Search
  SEARCH = 'search',

  // Notifications
  NOTIFICATION_VIEW = 'notification_view',
  NOTIFICATION_CLICK = 'notification_click',
}

@Entity('user_activities')
@Index(['userId', 'createdAt'])
@Index(['actionType', 'createdAt'])
@Index(['targetType', 'targetId', 'createdAt'])
@Index(['createdAt'])
// Partition by month for performance
export class UserActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'action_type',
    type: 'enum',
    enum: ActivityActionType,
  })
  actionType: ActivityActionType;

  // Target entity (post, comment, user, etc.)
  @Column({ name: 'target_type', length: 50, nullable: true })
  targetType: string; // 'post', 'comment', 'user', 'media'

  @Column({ name: 'target_id', type: 'uuid', nullable: true })
  targetId: string;

  // Session context
  @Column({ name: 'session_id', type: 'uuid', nullable: true })
  sessionId: string;

  // Additional context as JSONB
  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    // For search
    searchQuery?: string;
    searchResultsCount?: number;

    // For media
    mediaType?: string;
    videoDuration?: number;
    videoWatchTime?: number;

    // For posts
    postCategory?: string;
    postAuthorId?: string;

    // For navigation
    pageFrom?: string;
    pageTo?: string;

    // Device/location context
    deviceType?: string;
    country?: string;

    // Any other context
    [key: string]: any;
  };

  // Client timestamp (if different from server)
  @Column({ name: 'client_timestamp', type: 'timestamp', nullable: true })
  clientTimestamp: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
