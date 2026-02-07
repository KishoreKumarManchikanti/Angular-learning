import { Repository } from 'typeorm';
import { User, Post, Comment, PostLike, PostPin, PostSave, CommentLike } from '../../database/entities';
import { PostResponseDto, CommentResponseDto, PaginatedResponseDto, UserInteractionsDto, TrendingTopicDto, CreatePostDto, CreateCommentDto, GetFeedQueryDto, GetCommentsQueryDto, RecentActivityDto } from '../dto/news-feed.dto';
export declare class NewsFeedService {
    private readonly userRepository;
    private readonly postRepository;
    private readonly commentRepository;
    private readonly postLikeRepository;
    private readonly postPinRepository;
    private readonly postSaveRepository;
    private readonly commentLikeRepository;
    constructor(userRepository: Repository<User>, postRepository: Repository<Post>, commentRepository: Repository<Comment>, postLikeRepository: Repository<PostLike>, postPinRepository: Repository<PostPin>, postSaveRepository: Repository<PostSave>, commentLikeRepository: Repository<CommentLike>);
    private getTimeAgo;
    private mapUserToAuthor;
    private mapPostToDto;
    private mapCommentToDto;
    getFeed(userId: string, query: GetFeedQueryDto): Promise<PaginatedResponseDto<PostResponseDto>>;
    getPostById(userId: string, postId: string): Promise<PostResponseDto | null>;
    createPost(userId: string, dto: CreatePostDto): Promise<PostResponseDto>;
    getComments(userId: string, query: GetCommentsQueryDto): Promise<PaginatedResponseDto<CommentResponseDto>>;
    createComment(userId: string, dto: CreateCommentDto): Promise<CommentResponseDto>;
    deleteComment(userId: string, commentId: string): Promise<boolean>;
    toggleLike(userId: string, postId: string): Promise<{
        isLiked: boolean;
        likesCount: number;
    }>;
    togglePin(userId: string, postId: string): Promise<{
        isPinned: boolean;
    }>;
    toggleSave(userId: string, postId: string): Promise<{
        isSaved: boolean;
        bookmarksCount: number;
    }>;
    toggleCommentLike(userId: string, commentId: string): Promise<{
        isLiked: boolean;
        likesCount: number;
    }>;
    getUserInteractions(userId: string): Promise<UserInteractionsDto>;
    getTrendingTopics(): Promise<TrendingTopicDto[]>;
    getRecentActivity(userId: string): Promise<RecentActivityDto>;
}
