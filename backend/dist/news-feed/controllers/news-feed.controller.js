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
exports.NewsFeedController = void 0;
const common_1 = require("@nestjs/common");
const news_feed_service_1 = require("../services/news-feed.service");
const news_feed_dto_1 = require("../dto/news-feed.dto");
let NewsFeedController = class NewsFeedController {
    newsFeedService;
    constructor(newsFeedService) {
        this.newsFeedService = newsFeedService;
    }
    getUserId(headers) {
        return headers['x-user-id'] || 'user-1';
    }
    async getFeed(headers, query) {
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
    async getPost(headers, postId) {
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
    async createPost(headers, dto) {
        const userId = this.getUserId(headers);
        const data = await this.newsFeedService.createPost(userId, dto);
        return {
            success: true,
            data,
        };
    }
    async getComments(headers, postId, query) {
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
    async createComment(headers, postId, dto) {
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
    async deleteComment(headers, commentId) {
        const userId = this.getUserId(headers);
        await this.newsFeedService.deleteComment(userId, commentId);
    }
    async toggleLike(headers, postId) {
        const userId = this.getUserId(headers);
        const data = await this.newsFeedService.toggleLike(userId, postId);
        return {
            success: true,
            data,
        };
    }
    async togglePin(headers, postId) {
        const userId = this.getUserId(headers);
        const data = await this.newsFeedService.togglePin(userId, postId);
        return {
            success: true,
            data,
        };
    }
    async toggleSave(headers, postId) {
        const userId = this.getUserId(headers);
        const data = await this.newsFeedService.toggleSave(userId, postId);
        return {
            success: true,
            data,
        };
    }
    async toggleCommentLike(headers, commentId) {
        const userId = this.getUserId(headers);
        const data = await this.newsFeedService.toggleCommentLike(userId, commentId);
        return {
            success: true,
            data,
        };
    }
    async getUserInteractions(headers) {
        const userId = this.getUserId(headers);
        const data = await this.newsFeedService.getUserInteractions(userId);
        return {
            success: true,
            data,
        };
    }
    async getRecentActivity(headers) {
        const userId = this.getUserId(headers);
        const data = await this.newsFeedService.getRecentActivity(userId);
        return {
            success: true,
            data,
        };
    }
    async getTrending() {
        const data = await this.newsFeedService.getTrendingTopics();
        return {
            success: true,
            data,
        };
    }
};
exports.NewsFeedController = NewsFeedController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, news_feed_dto_1.GetFeedQueryDto]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "getFeed", null);
__decorate([
    (0, common_1.Get)('posts/:id'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)('posts'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, news_feed_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('posts/:postId/comments'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('postId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "getComments", null);
__decorate([
    (0, common_1.Post)('posts/:postId/comments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('postId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "createComment", null);
__decorate([
    (0, common_1.Delete)('comments/:commentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Post)('posts/:postId/like'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "toggleLike", null);
__decorate([
    (0, common_1.Post)('posts/:postId/pin'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "togglePin", null);
__decorate([
    (0, common_1.Post)('posts/:postId/save'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "toggleSave", null);
__decorate([
    (0, common_1.Post)('comments/:commentId/like'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "toggleCommentLike", null);
__decorate([
    (0, common_1.Get)('user/interactions'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "getUserInteractions", null);
__decorate([
    (0, common_1.Get)('user/recent-activity'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "getRecentActivity", null);
__decorate([
    (0, common_1.Get)('trending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsFeedController.prototype, "getTrending", null);
exports.NewsFeedController = NewsFeedController = __decorate([
    (0, common_1.Controller)('news-feed'),
    __metadata("design:paramtypes", [news_feed_service_1.NewsFeedService])
], NewsFeedController);
//# sourceMappingURL=news-feed.controller.js.map