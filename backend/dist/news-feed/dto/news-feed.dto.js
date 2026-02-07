"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.RecentActivityDto = exports.RecentActivityItemDto = exports.TrendingTopicDto = exports.InteractionItemDto = exports.GroupedInteractionsDto = exports.UserInteractionsDto = exports.PaginatedResponseDto = exports.CommentResponseDto = exports.PostResponseDto = exports.AuthorDto = exports.CreateBookmarkCollectionDto = exports.GetCommentsQueryDto = exports.GetFeedQueryDto = exports.UpdateCommentDto = exports.CreateCommentDto = exports.UpdatePostDto = exports.CreatePostDto = void 0;
class CreatePostDto {
    content;
    imageUrl;
    videoUrl;
    category;
    tags;
    visibility;
}
exports.CreatePostDto = CreatePostDto;
class UpdatePostDto {
    content;
    imageUrl;
    videoUrl;
    category;
    tags;
    visibility;
}
exports.UpdatePostDto = UpdatePostDto;
class CreateCommentDto {
    postId;
    parentId;
    content;
}
exports.CreateCommentDto = CreateCommentDto;
class UpdateCommentDto {
    content;
}
exports.UpdateCommentDto = UpdateCommentDto;
class GetFeedQueryDto {
    page;
    limit;
    category;
    cursor;
}
exports.GetFeedQueryDto = GetFeedQueryDto;
class GetCommentsQueryDto {
    postId;
    page;
    limit;
    sortBy;
    parentId;
}
exports.GetCommentsQueryDto = GetCommentsQueryDto;
class CreateBookmarkCollectionDto {
    name;
    description;
    isPrivate;
}
exports.CreateBookmarkCollectionDto = CreateBookmarkCollectionDto;
class AuthorDto {
    id;
    username;
    displayName;
    avatar;
    isVerified;
}
exports.AuthorDto = AuthorDto;
class PostResponseDto {
    id;
    author;
    content;
    imageUrl;
    videoUrl;
    category;
    tags;
    likesCount;
    commentsCount;
    sharesCount;
    bookmarksCount;
    isLiked;
    isPinned;
    isSaved;
    createdAt;
    updatedAt;
    timeAgo;
}
exports.PostResponseDto = PostResponseDto;
class CommentResponseDto {
    id;
    postId;
    author;
    parentId;
    content;
    likesCount;
    repliesCount;
    replies;
    isLiked;
    isAuthor;
    depth;
    createdAt;
    timeAgo;
}
exports.CommentResponseDto = CommentResponseDto;
class PaginatedResponseDto {
    data;
    pagination;
}
exports.PaginatedResponseDto = PaginatedResponseDto;
class UserInteractionsDto {
    liked;
    pinned;
    saved;
}
exports.UserInteractionsDto = UserInteractionsDto;
class GroupedInteractionsDto {
    category;
    items;
    count;
}
exports.GroupedInteractionsDto = GroupedInteractionsDto;
class InteractionItemDto {
    id;
    postId;
    title;
    preview;
    category;
    timeAgo;
    createdAt;
}
exports.InteractionItemDto = InteractionItemDto;
class TrendingTopicDto {
    rank;
    tag;
    postsCount;
    formattedCount;
}
exports.TrendingTopicDto = TrendingTopicDto;
class RecentActivityItemDto {
    id;
    type;
    postId;
    postPreview;
    postAuthor;
    isOwnPost;
    comment;
    timeAgo;
    createdAt;
}
exports.RecentActivityItemDto = RecentActivityItemDto;
class RecentActivityDto {
    commentsOnOthersPosts;
    commentsOnOwnPosts;
    recentRepliesReceived;
    totalCount;
}
exports.RecentActivityDto = RecentActivityDto;
class ApiResponse {
    success;
    data;
    error;
    meta;
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=news-feed.dto.js.map