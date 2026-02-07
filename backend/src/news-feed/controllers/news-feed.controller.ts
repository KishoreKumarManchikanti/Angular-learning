import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NewsFeedService } from '../services/news-feed.service';
import {
  CreatePostDto,
  CreateCommentDto,
  UpdateCommentDto,
  GetFeedQueryDto,
  GetCommentsQueryDto,
  ApiResponse,
  PostResponseDto,
  CommentResponseDto,
  PaginatedResponseDto,
  UserInteractionsDto,
  TrendingTopicDto,
  RecentActivityDto,
} from '../dto/news-feed.dto';

/**
 * News Feed API Controller
 *
 * Base URL: /api/news-feed (global prefix 'api' + controller 'news-feed')
 *
 * Authentication: Pass user ID in X-User-Id header (replace with JWT in production)
 */
@Controller('news-feed')
export class NewsFeedController {
  constructor(private readonly newsFeedService: NewsFeedService) {}

  // Helper to get user ID from headers (replace with JWT extraction in production)
  private getUserId(headers: Record<string, string>): string {
    return headers['x-user-id'] || 'user-1';
  }

  // ============================================
  // FEED ENDPOINTS
  // ============================================

  /**
   * GET /api/news-feed
   * Get paginated news feed
   */
  @Get()
  async getFeed(
    @Headers() headers: Record<string, string>,
    @Query() query: GetFeedQueryDto,
  ): Promise<ApiResponse<PaginatedResponseDto<PostResponseDto>>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.getFeed(userId, query);

    return {
      success: true,
      data,
      meta: {
        timestamp: new Date(),
        requestId: `req-${Date.now()}`,
      },
    };
  }

  /**
   * GET /api/news-feed/posts/:id
   * Get single post by ID
   */
  @Get('posts/:id')
  async getPost(
    @Headers() headers: Record<string, string>,
    @Param('id') postId: string,
  ): Promise<ApiResponse<PostResponseDto>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.getPostById(userId, postId);

    if (!data) {
      return {
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Post not found',
        },
      };
    }

    return {
      success: true,
      data,
    };
  }

  /**
   * POST /api/news-feed/posts
   * Create a new post
   */
  @Post('posts')
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @Headers() headers: Record<string, string>,
    @Body() dto: CreatePostDto,
  ): Promise<ApiResponse<PostResponseDto>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.createPost(userId, dto);

    return {
      success: true,
      data,
    };
  }

  // ============================================
  // COMMENT ENDPOINTS
  // ============================================

  /**
   * GET /api/news-feed/posts/:postId/comments
   * Get comments for a post
   */
  @Get('posts/:postId/comments')
  async getComments(
    @Headers() headers: Record<string, string>,
    @Param('postId') postId: string,
    @Query() query: Omit<GetCommentsQueryDto, 'postId'>,
  ): Promise<ApiResponse<PaginatedResponseDto<CommentResponseDto>>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.getComments(userId, {
      ...query,
      postId,
    });

    return {
      success: true,
      data,
    };
  }

  /**
   * POST /api/news-feed/posts/:postId/comments
   * Add a comment to a post
   */
  @Post('posts/:postId/comments')
  @HttpCode(HttpStatus.CREATED)
  async createComment(
    @Headers() headers: Record<string, string>,
    @Param('postId') postId: string,
    @Body() dto: Omit<CreateCommentDto, 'postId'>,
  ): Promise<ApiResponse<CommentResponseDto>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.createComment(userId, {
      ...dto,
      postId,
    });

    return {
      success: true,
      data,
    };
  }

  /**
   * DELETE /api/news-feed/comments/:commentId
   * Delete a comment
   */
  @Delete('comments/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Headers() headers: Record<string, string>,
    @Param('commentId') commentId: string,
  ): Promise<void> {
    const userId = this.getUserId(headers);
    await this.newsFeedService.deleteComment(userId, commentId);
  }

  // ============================================
  // INTERACTION ENDPOINTS
  // ============================================

  /**
   * POST /api/news-feed/posts/:postId/like
   * Toggle like on a post
   */
  @Post('posts/:postId/like')
  async toggleLike(
    @Headers() headers: Record<string, string>,
    @Param('postId') postId: string,
  ): Promise<ApiResponse<{ isLiked: boolean; likesCount: number }>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.toggleLike(userId, postId);

    return {
      success: true,
      data,
    };
  }

  /**
   * POST /api/news-feed/posts/:postId/pin
   * Toggle pin on a post
   */
  @Post('posts/:postId/pin')
  async togglePin(
    @Headers() headers: Record<string, string>,
    @Param('postId') postId: string,
  ): Promise<ApiResponse<{ isPinned: boolean }>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.togglePin(userId, postId);

    return {
      success: true,
      data,
    };
  }

  /**
   * POST /api/news-feed/posts/:postId/save
   * Toggle save/bookmark on a post
   */
  @Post('posts/:postId/save')
  async toggleSave(
    @Headers() headers: Record<string, string>,
    @Param('postId') postId: string,
  ): Promise<ApiResponse<{ isSaved: boolean; bookmarksCount: number }>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.toggleSave(userId, postId);

    return {
      success: true,
      data,
    };
  }

  /**
   * POST /api/news-feed/comments/:commentId/like
   * Toggle like on a comment
   */
  @Post('comments/:commentId/like')
  async toggleCommentLike(
    @Headers() headers: Record<string, string>,
    @Param('commentId') commentId: string,
  ): Promise<ApiResponse<{ isLiked: boolean; likesCount: number }>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.toggleCommentLike(
      userId,
      commentId,
    );

    return {
      success: true,
      data,
    };
  }

  // ============================================
  // USER DATA ENDPOINTS
  // ============================================

  /**
   * GET /api/news-feed/user/interactions
   * Get user's liked, pinned, and saved posts
   */
  @Get('user/interactions')
  async getUserInteractions(
    @Headers() headers: Record<string, string>,
  ): Promise<ApiResponse<UserInteractionsDto>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.getUserInteractions(userId);

    return {
      success: true,
      data,
    };
  }

  /**
   * GET /api/news-feed/user/recent-activity
   * Get user's recent comment activity (comments on own posts and others' posts)
   */
  @Get('user/recent-activity')
  async getRecentActivity(
    @Headers() headers: Record<string, string>,
  ): Promise<ApiResponse<RecentActivityDto>> {
    const userId = this.getUserId(headers);
    const data = await this.newsFeedService.getRecentActivity(userId);

    return {
      success: true,
      data,
    };
  }

  /**
   * GET /api/news-feed/trending
   * Get trending topics
   */
  @Get('trending')
  async getTrending(): Promise<ApiResponse<TrendingTopicDto[]>> {
    const data = await this.newsFeedService.getTrendingTopics();

    return {
      success: true,
      data,
    };
  }
}
