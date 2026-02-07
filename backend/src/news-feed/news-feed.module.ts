import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsFeedController } from './controllers/news-feed.controller';
import { NewsFeedService } from './services/news-feed.service';
import {
  User,
  Post,
  Comment,
  PostLike,
  PostPin,
  PostSave,
  CommentLike,
  Media,
} from '../database/entities';

/**
 * News Feed Module
 *
 * This module handles all news feed related functionality:
 * - Post CRUD operations
 * - Comments with threading
 * - User interactions (like, pin, save)
 * - Feed generation and pagination
 * - Trending topics
 *
 * Uses TypeORM for database operations
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Post,
      Comment,
      PostLike,
      PostPin,
      PostSave,
      CommentLike,
      Media,
    ]),
  ],
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
  exports: [NewsFeedService],
})
export class NewsFeedModule {}
