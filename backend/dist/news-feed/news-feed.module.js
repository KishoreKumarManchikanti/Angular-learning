"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const news_feed_controller_1 = require("./controllers/news-feed.controller");
const news_feed_service_1 = require("./services/news-feed.service");
const entities_1 = require("../database/entities");
let NewsFeedModule = class NewsFeedModule {
};
exports.NewsFeedModule = NewsFeedModule;
exports.NewsFeedModule = NewsFeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.User,
                entities_1.Post,
                entities_1.Comment,
                entities_1.PostLike,
                entities_1.PostPin,
                entities_1.PostSave,
                entities_1.CommentLike,
                entities_1.Media,
            ]),
        ],
        controllers: [news_feed_controller_1.NewsFeedController],
        providers: [news_feed_service_1.NewsFeedService],
        exports: [news_feed_service_1.NewsFeedService],
    })
], NewsFeedModule);
//# sourceMappingURL=news-feed.module.js.map