import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { CommentLike } from './comment-like.entity';

@Entity('comments')
@Index(['postId', 'createdAt'])
@Index(['authorId', 'createdAt'])
@Index(['parentId'])
@Index(['postId', 'parentId', 'createdAt']) // For threaded comments
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  author: User;

  // Self-referencing for threaded comments
  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId: string | null;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @Column({ type: 'text' })
  content: string;

  // Nesting depth (0 = top-level, 1 = reply, 2 = reply to reply, etc.)
  @Column({ default: 0 })
  depth: number;

  // Denormalized counters
  @Column({ name: 'likes_count', default: 0 })
  likesCount: number;

  @Column({ name: 'replies_count', default: 0 })
  repliesCount: number;

  // Comment status
  @Column({ name: 'is_edited', default: false })
  isEdited: boolean;

  @Column({ name: 'edited_at', type: 'timestamp', nullable: true })
  editedAt: Date;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  // Metadata for mentions, etc.
  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    mentions?: string[];
    editHistory?: { content: string; editedAt: Date }[];
  };

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => CommentLike, (like) => like.comment)
  likes: CommentLike[];
}
