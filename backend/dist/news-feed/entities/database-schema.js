"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.PostVisibility = exports.PostCategory = void 0;
var PostCategory;
(function (PostCategory) {
    PostCategory["TECHNOLOGY"] = "technology";
    PostCategory["SPORTS"] = "sports";
    PostCategory["FINANCE"] = "finance";
    PostCategory["HEALTH"] = "health";
    PostCategory["TRAVEL"] = "travel";
    PostCategory["FOOD"] = "food";
    PostCategory["SCIENCE"] = "science";
    PostCategory["ENTERTAINMENT"] = "entertainment";
    PostCategory["POLITICS"] = "politics";
    PostCategory["CRYPTO"] = "crypto";
    PostCategory["GENERAL"] = "general";
})(PostCategory || (exports.PostCategory = PostCategory = {}));
var PostVisibility;
(function (PostVisibility) {
    PostVisibility["PUBLIC"] = "public";
    PostVisibility["FOLLOWERS"] = "followers";
    PostVisibility["PRIVATE"] = "private";
})(PostVisibility || (exports.PostVisibility = PostVisibility = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["LIKE_POST"] = "like_post";
    NotificationType["LIKE_COMMENT"] = "like_comment";
    NotificationType["COMMENT"] = "comment";
    NotificationType["REPLY"] = "reply";
    NotificationType["FOLLOW"] = "follow";
    NotificationType["MENTION"] = "mention";
    NotificationType["SHARE"] = "share";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
//# sourceMappingURL=database-schema.js.map