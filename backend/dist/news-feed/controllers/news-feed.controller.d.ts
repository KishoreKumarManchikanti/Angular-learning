import { NewsFeedService } from '../services/news-feed.service';
import { CreatePostDto, CreateCommentDto, GetFeedQueryDto, GetCommentsQueryDto, ApiResponse, PostResponseDto, CommentResponseDto, PaginatedResponseDto, UserInteractionsDto, TrendingTopicDto, RecentActivityDto } from '../dto/news-feed.dto';
export declare class NewsFeedController {
    private readonly newsFeedService;
    constructor(newsFeedService: NewsFeedService);
    private getUserId;
    getFeed(headers: Record<string, string>, query: GetFeedQueryDto): Promise<ApiResponse<PaginatedResponseDto<PostResponseDto>>>;
    getPost(headers: Record<string, string>, postId: string): Promise<ApiResponse<PostResponseDto>>;
    createPost(headers: Record<string, string>, dto: CreatePostDto): Promise<ApiResponse<PostResponseDto>>;
    getComments(headers: Record<string, string>, postId: string, query: Omit<GetCommentsQueryDto, 'postId'>): Promise<ApiResponse<PaginatedResponseDto<CommentResponseDto>>>;
    createComment(headers: Record<string, string>, postId: string, dto: Omit<CreateCommentDto, 'postId'>): Promise<ApiResponse<CommentResponseDto>>;
    deleteComment(headers: Record<string, string>, commentId: string): Promise<void>;
    toggleLike(headers: Record<string, string>, postId: string): Promise<ApiResponse<{
        isLiked: boolean;
        likesCount: number;
    }>>;
    togglePin(headers: Record<string, string>, postId: string): Promise<ApiResponse<{
        isPinned: boolean;
    }>>;
    toggleSave(headers: Record<string, string>, postId: string): Promise<ApiResponse<{
        isSaved: boolean;
        bookmarksCount: number;
    }>>;
    toggleCommentLike(headers: Record<string, string>, commentId: string): Promise<ApiResponse<{
        isLiked: boolean;
        likesCount: number;
    }>>;
    getUserInteractions(headers: Record<string, string>): Promise<ApiResponse<UserInteractionsDto>>;
    getRecentActivity(headers: Record<string, string>): Promise<ApiResponse<RecentActivityDto>>;
    getTrending(): Promise<ApiResponse<TrendingTopicDto[]>>;
}
