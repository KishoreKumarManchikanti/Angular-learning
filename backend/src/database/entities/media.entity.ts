import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  GIF = 'gif',
}

export enum MediaStatus {
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
}

@Entity('media')
@Index(['postId'])
@Index(['userId', 'createdAt'])
@Index(['status'])
@Index(['type', 'createdAt'])
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'post_id', type: 'uuid', nullable: true })
  postId: string;

  @ManyToOne(() => Post, (post) => post.media, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.IMAGE,
  })
  type: MediaType;

  // Storage information
  @Column({ name: 'storage_key', length: 500 })
  storageKey: string; // S3/MinIO key: media/2026/02/user-123/abc123.jpg

  @Column({ name: 'cdn_url', length: 500 })
  cdnUrl: string; // Public URL for access

  @Column({ name: 'thumbnail_url', length: 500, nullable: true })
  thumbnailUrl: string; // For videos and large images

  // File information
  @Column({ name: 'original_filename', length: 255 })
  originalFilename: string;

  @Column({ name: 'mime_type', length: 100 })
  mimeType: string; // image/jpeg, video/mp4, etc.

  @Column({ name: 'file_size' })
  fileSize: number; // Size in bytes

  // Dimensions
  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  // Video-specific
  @Column({ name: 'duration_seconds', type: 'float', nullable: true })
  durationSeconds: number;

  @Column({ name: 'bitrate', nullable: true })
  bitrate: number;

  @Column({ name: 'fps', type: 'float', nullable: true })
  fps: number;

  // Processing status
  @Column({
    type: 'enum',
    enum: MediaStatus,
    default: MediaStatus.UPLOADING,
  })
  status: MediaStatus;

  @Column({ name: 'processing_error', type: 'text', nullable: true })
  processingError: string;

  // Responsive variants (different sizes)
  @Column({ type: 'jsonb', nullable: true })
  variants: {
    thumbnail?: string; // 150px
    small?: string; // 320px
    medium?: string; // 640px
    large?: string; // 1280px
    original?: string; // Full size
  };

  // Additional metadata
  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    // Visual
    blurhash?: string; // Placeholder blur hash
    dominantColor?: string; // Main color for placeholder

    // Image EXIF data
    exif?: {
      make?: string;
      model?: string;
      aperture?: string;
      exposureTime?: string;
      iso?: number;
      focalLength?: string;
      gps?: { lat: number; lng: number };
      takenAt?: Date;
    };

    // Video codec info
    codec?: {
      video?: string;
      audio?: string;
    };

    // Processing info
    processedAt?: Date;
    processingDuration?: number; // in ms
  };

  // Analytics
  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  // Ordering within a post (for galleries)
  @Column({ name: 'order_index', default: 0 })
  orderIndex: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
