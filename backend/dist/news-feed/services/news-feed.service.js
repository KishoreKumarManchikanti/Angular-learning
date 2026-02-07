"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
let NewsFeedService = class NewsFeedService {
    userRepository;
    postRepository;
    commentRepository;
    postLikeRepository;
    postPinRepository;
    postSaveRepository;
    commentLikeRepository;
    constructor(userRepository, postRepository, commentRepository, postLikeRepository, postPinRepository, postSaveRepository, commentLikeRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.postLikeRepository = postLikeRepository;
        this.postPinRepository = postPinRepository;
        this.postSaveRepository = postSaveRepository;
        this.commentLikeRepository = commentLikeRepository;
    }
    getTimeAgo(date) {
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        if (seconds < 60)
            return 'just now';
        if (seconds < 3600)
            return `${Math.floor(seconds / 60)}m`;
        if (seconds < 86400)
            return `${Math.floor(seconds / 3600)}h`;
        if (seconds < 604800)
            return `${Math.floor(seconds / 86400)}d`;
        return `${Math.floor(seconds / 604800)}w`;
    }
    mapUserToAuthor(user) {
        return {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            avatar: user.avatarUrl ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`,
            isVerified: user.isVerified,
        };
    }
    mapPostToDto(post, userLikedIds, userPinnedIds, userSavedIds) {
        return {
            id: post.id,
            author: this.mapUserToAuthor(post.author),
            content: post.content,
            imageUrl: post.imageUrl || undefined,
            category: post.category,
            tags: post.metadata?.hashtags || [],
            likesCount: post.likesCount,
            commentsCount: post.commentsCount,
            sharesCount: post.sharesCount,
            bookmarksCount: post.savesCount,
            isLiked: userLikedIds.has(post.id),
            isPinned: userPinnedIds.has(post.id),
            isSaved: userSavedIds.has(post.id),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            timeAgo: this.getTimeAgo(post.createdAt),
        };
    }
    mapCommentToDto(comment, userId, userLikedCommentIds) {
        return {
            id: comment.id,
            postId: comment.postId,
            parentId: comment.parentId || undefined,
            author: this.mapUserToAuthor(comment.author),
            content: comment.content,
            likesCount: comment.likesCount,
            repliesCount: comment.repliesCount,
            replies: comment.replies?.map((reply) => this.mapCommentToDto(reply, userId, userLikedCommentIds)),
            isLiked: userLikedCommentIds.has(comment.id),
            isAuthor: comment.authorId === userId,
            depth: comment.depth,
            createdAt: comment.createdAt,
            timeAgo: this.getTimeAgo(comment.createdAt),
        };
    }
    async getFeed(userId, query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const queryBuilder = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .where('post.status = :status', { status: 'published' })
            .andWhere('post.visibility = :visibility', { visibility: 'public' });
        if (query.category) {
            queryBuilder.andWhere('post.category = :category', {
                category: query.category,
            });
        }
        const total = await queryBuilder.getCount();
        const posts = await queryBuilder
            .orderBy('post.createdAt', 'DESC')
            .skip(skip)
            .take(limit)
            .getMany();
        const postIds = posts.map((p) => p.id);
        let userLikedIds = new Set();
        let userPinnedIds = new Set();
        let userSavedIds = new Set();
        if (postIds.length > 0) {
            const [userLikes, userPins, userSaves] = await Promise.all([
                this.postLikeRepository.find({
                    where: { userId, postId: (0, typeorm_2.In)(postIds) },
                    select: ['postId'],
                }),
                this.postPinRepository.find({
                    where: { userId, postId: (0, typeorm_2.In)(postIds) },
                    select: ['postId'],
                }),
                this.postSaveRepository.find({
                    where: { userId, postId: (0, typeorm_2.In)(postIds) },
                    select: ['postId'],
                }),
            ]);
            userLikedIds = new Set(userLikes.map((l) => l.postId));
            userPinnedIds = new Set(userPins.map((p) => p.postId));
            userSavedIds = new Set(userSaves.map((s) => s.postId));
        }
        const data = posts.map((post) => this.mapPostToDto(post, userLikedIds, userPinnedIds, userSavedIds));
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasMore: skip + limit < total,
                nextCursor: data.length > 0 ? data[data.length - 1].id : undefined,
            },
        };
    }
    async getPostById(userId, postId) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ['author'],
        });
        if (!post)
            return null;
        const [like, pin, save] = await Promise.all([
            this.postLikeRepository.findOne({ where: { userId, postId } }),
            this.postPinRepository.findOne({ where: { userId, postId } }),
            this.postSaveRepository.findOne({ where: { userId, postId } }),
        ]);
        return this.mapPostToDto(post, like ? new Set([postId]) : new Set(), pin ? new Set([postId]) : new Set(), save ? new Set([postId]) : new Set());
    }
    async createPost(userId, dto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const newPost = new entities_1.Post();
        newPost.authorId = userId;
        newPost.content = dto.content;
        newPost.imageUrl = dto.imageUrl || null;
        newPost.category = dto.category;
        newPost.metadata = { hashtags: dto.tags || [] };
        const savedPost = await this.postRepository.save(newPost);
        savedPost.author = user;
        await this.userRepository.increment({ id: userId }, 'postsCount', 1);
        return this.mapPostToDto(savedPost, new Set(), new Set(), new Set());
    }
    async getComments(userId, query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const skip = (page - 1) * limit;
        const queryBuilder = this.commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.author', 'author')
            .leftJoinAndSelect('comment.replies', 'replies')
            .leftJoinAndSelect('replies.author', 'replyAuthor')
            .where('comment.postId = :postId', { postId: query.postId })
            .andWhere('comment.isDeleted = false');
        if (query.parentId) {
            queryBuilder.andWhere('comment.parentId = :parentId', {
                parentId: query.parentId,
            });
        }
        else {
            queryBuilder.andWhere('comment.parentId IS NULL');
        }
        switch (query.sortBy) {
            case 'oldest':
                queryBuilder.orderBy('comment.createdAt', 'ASC');
                break;
            case 'popular':
                queryBuilder.orderBy('comment.likesCount', 'DESC');
                break;
            default:
                queryBuilder.orderBy('comment.createdAt', 'DESC');
        }
        const total = await queryBuilder.getCount();
        const comments = await queryBuilder.skip(skip).take(limit).getMany();
        const allCommentIds = comments.flatMap((c) => [
            c.id,
            ...(c.replies?.map((r) => r.id) || []),
        ]);
        let userLikedCommentIds = new Set();
        if (allCommentIds.length > 0) {
            const userCommentLikes = await this.commentLikeRepository.find({
                where: { userId, commentId: (0, typeorm_2.In)(allCommentIds) },
                select: ['commentId'],
            });
            userLikedCommentIds = new Set(userCommentLikes.map((l) => l.commentId));
        }
        const data = comments.map((comment) => this.mapCommentToDto(comment, userId, userLikedCommentIds));
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasMore: skip + limit < total,
            },
        };
    }
    async createComment(userId, dto) {
        const [user, post] = await Promise.all([
            this.userRepository.findOne({ where: { id: userId } }),
            this.postRepository.findOne({ where: { id: dto.postId } }),
        ]);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        let depth = 0;
        if (dto.parentId) {
            const parentComment = await this.commentRepository.findOne({
                where: { id: dto.parentId },
            });
            if (!parentComment)
                throw new common_1.NotFoundException('Parent comment not found');
            depth = parentComment.depth + 1;
            await this.commentRepository.increment({ id: dto.parentId }, 'repliesCount', 1);
        }
        const newComment = new entities_1.Comment();
        newComment.postId = dto.postId;
        newComment.authorId = userId;
        newComment.parentId = dto.parentId || null;
        newComment.content = dto.content;
        newComment.depth = depth;
        const savedComment = await this.commentRepository.save(newComment);
        savedComment.author = user;
        await this.postRepository.increment({ id: dto.postId }, 'commentsCount', 1);
        return this.mapCommentToDto(savedComment, userId, new Set());
    }
    async deleteComment(userId, commentId) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId },
        });
        if (!comment)
            return false;
        if (comment.authorId !== userId)
            return false;
        await this.commentRepository.update(commentId, { isDeleted: true });
        await this.postRepository.decrement({ id: comment.postId }, 'commentsCount', 1);
        if (comment.parentId) {
            await this.commentRepository.decrement({ id: comment.parentId }, 'repliesCount', 1);
        }
        return true;
    }
    async toggleLike(userId, postId) {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        const existingLike = await this.postLikeRepository.findOne({
            where: { userId, postId },
        });
        if (existingLike) {
            await this.postLikeRepository.remove(existingLike);
            await this.postRepository.decrement({ id: postId }, 'likesCount', 1);
            return { isLiked: false, likesCount: post.likesCount - 1 };
        }
        else {
            await this.postLikeRepository.save({ userId, postId });
            await this.postRepository.increment({ id: postId }, 'likesCount', 1);
            return { isLiked: true, likesCount: post.likesCount + 1 };
        }
    }
    async togglePin(userId, postId) {
        const existingPin = await this.postPinRepository.findOne({
            where: { userId, postId },
        });
        if (existingPin) {
            await this.postPinRepository.remove(existingPin);
            return { isPinned: false };
        }
        else {
            await this.postPinRepository.save({ userId, postId });
            return { isPinned: true };
        }
    }
    async toggleSave(userId, postId) {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        const existingSave = await this.postSaveRepository.findOne({
            where: { userId, postId },
        });
        if (existingSave) {
            await this.postSaveRepository.remove(existingSave);
            await this.postRepository.decrement({ id: postId }, 'savesCount', 1);
            return { isSaved: false, bookmarksCount: post.savesCount - 1 };
        }
        else {
            await this.postSaveRepository.save({ userId, postId });
            await this.postRepository.increment({ id: postId }, 'savesCount', 1);
            return { isSaved: true, bookmarksCount: post.savesCount + 1 };
        }
    }
    async toggleCommentLike(userId, commentId) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId },
        });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        const existingLike = await this.commentLikeRepository.findOne({
            where: { userId, commentId },
        });
        if (existingLike) {
            await this.commentLikeRepository.remove(existingLike);
            await this.commentRepository.decrement({ id: commentId }, 'likesCount', 1);
            return { isLiked: false, likesCount: comment.likesCount - 1 };
        }
        else {
            await this.commentLikeRepository.save({ userId, commentId });
            await this.commentRepository.increment({ id: commentId }, 'likesCount', 1);
            return { isLiked: true, likesCount: comment.likesCount + 1 };
        }
    }
    async getUserInteractions(userId) {
        const [likedPosts, pinnedPosts, savedPosts] = await Promise.all([
            this.postLikeRepository.find({
                where: { userId },
                relations: ['post', 'post.author'],
                order: { createdAt: 'DESC' },
                take: 50,
            }),
            this.postPinRepository.find({
                where: { userId },
                relations: ['post', 'post.author'],
                order: { createdAt: 'DESC' },
                take: 50,
            }),
            this.postSaveRepository.find({
                where: { userId },
                relations: ['post', 'post.author'],
                order: { createdAt: 'DESC' },
                take: 50,
            }),
        ]);
        const groupByCategory = (items) => {
            const grouped = new Map();
            items.forEach((item) => {
                if (!item.post)
                    return;
                const category = item.post.category;
                if (!grouped.has(category)) {
                    grouped.set(category, {
                        category: category,
                        items: [],
                        count: 0,
                    });
                }
                const group = grouped.get(category);
                group.items.push({
                    id: `interaction-${item.post.id}`,
                    postId: item.post.id,
                    title: item.post.content.substring(0, 60) + '...',
                    preview: item.post.content.substring(0, 40),
                    category: category,
                    timeAgo: this.getTimeAgo(item.post.createdAt),
                    createdAt: item.post.createdAt,
                });
                group.count++;
            });
            return Array.from(grouped.values());
        };
        return {
            liked: groupByCategory(likedPosts),
            pinned: groupByCategory(pinnedPosts),
            saved: groupByCategory(savedPosts),
        };
    }
    async getTrendingTopics() {
        const recentPosts = await this.postRepository
            .createQueryBuilder('post')
            .select('post.metadata')
            .where('post.createdAt > :date', {
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        })
            .andWhere('post.metadata IS NOT NULL')
            .getMany();
        const hashtagCounts = new Map();
        recentPosts.forEach((post) => {
            const hashtags = post.metadata?.hashtags || [];
            hashtags.forEach((tag) => {
                hashtagCounts.set(tag, (hashtagCounts.get(tag) || 0) + 1);
            });
        });
        const sortedTags = Array.from(hashtagCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        if (sortedTags.length === 0) {
            return [
                {
                    rank: 1,
                    tag: 'AI Technology',
                    postsCount: 12500,
                    formattedCount: '12.5K posts',
                },
                {
                    rank: 2,
                    tag: 'Climate Summit',
                    postsCount: 8200,
                    formattedCount: '8.2K posts',
                },
                {
                    rank: 3,
                    tag: 'Space Mission',
                    postsCount: 6800,
                    formattedCount: '6.8K posts',
                },
                {
                    rank: 4,
                    tag: 'World Cup',
                    postsCount: 5100,
                    formattedCount: '5.1K posts',
                },
                {
                    rank: 5,
                    tag: 'Market Rally',
                    postsCount: 3900,
                    formattedCount: '3.9K posts',
                },
            ];
        }
        return sortedTags.map(([tag, count], index) => ({
            rank: index + 1,
            tag,
            postsCount: count * 100,
            formattedCount: count >= 1000
                ? `${(count / 1000).toFixed(1)}K posts`
                : `${count * 100} posts`,
        }));
    }
    async getRecentActivity(userId) {
        const userPosts = await this.postRepository.find({
            where: { authorId: userId },
            select: ['id'],
        });
        const userPostIds = new Set(userPosts.map((p) => p.id));
        const userComments = await this.commentRepository.find({
            where: { authorId: userId, isDeleted: false },
            relations: ['post', 'post.author'],
            order: { createdAt: 'DESC' },
            take: 20,
        });
        const commentsOnOthersPosts = [];
        const commentsOnOwnPosts = [];
        userComments.forEach((comment) => {
            if (!comment.post)
                return;
            const isOwnPost = userPostIds.has(comment.postId);
            const activityItem = {
                id: `activity-${comment.id}`,
                type: comment.parentId ? 'reply' : 'comment',
                postId: comment.postId,
                postPreview: comment.post.content.substring(0, 80) + '...',
                postAuthor: this.mapUserToAuthor(comment.post.author),
                isOwnPost,
                comment: {
                    id: comment.id,
                    content: comment.content,
                    likesCount: comment.likesCount,
                    repliesCount: comment.repliesCount,
                },
                timeAgo: this.getTimeAgo(comment.createdAt),
                createdAt: comment.createdAt,
            };
            if (isOwnPost) {
                commentsOnOwnPosts.push(activityItem);
            }
            else {
                commentsOnOthersPosts.push(activityItem);
            }
        });
        const userCommentIds = userComments.map((c) => c.id);
        let recentRepliesReceived = [];
        if (userCommentIds.length > 0) {
            const repliesReceived = await this.commentRepository.find({
                where: {
                    parentId: (0, typeorm_2.In)(userCommentIds),
                    isDeleted: false,
                },
                relations: ['author', 'post'],
                order: { createdAt: 'DESC' },
                take: 10,
            });
            recentRepliesReceived = repliesReceived
                .filter((reply) => reply.authorId !== userId)
                .map((reply) => ({
                id: `activity-reply-${reply.id}`,
                type: 'reply',
                postId: reply.postId,
                postPreview: reply.post?.content.substring(0, 80) + '...' || '',
                postAuthor: this.mapUserToAuthor(reply.author),
                isOwnPost: userPostIds.has(reply.postId),
                comment: {
                    id: reply.id,
                    content: reply.content,
                    likesCount: reply.likesCount,
                    repliesCount: 0,
                },
                timeAgo: this.getTimeAgo(reply.createdAt),
                createdAt: reply.createdAt,
            }));
        }
        return {
            commentsOnOthersPosts: commentsOnOthersPosts.slice(0, 10),
            commentsOnOwnPosts: commentsOnOwnPosts.slice(0, 10),
            recentRepliesReceived: recentRepliesReceived.slice(0, 10),
            totalCount: commentsOnOthersPosts.length +
                commentsOnOwnPosts.length +
                recentRepliesReceived.length,
        };
    }
};
exports.NewsFeedService = NewsFeedService;
exports.NewsFeedService = NewsFeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Comment)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.PostLike)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.PostPin)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.PostSave)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.CommentLike)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NewsFeedService);
//# sourceMappingURL=news-feed.service.js.map