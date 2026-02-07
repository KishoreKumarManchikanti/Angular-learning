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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivity = exports.ActivityActionType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
var ActivityActionType;
(function (ActivityActionType) {
    ActivityActionType["POST_CREATE"] = "post_create";
    ActivityActionType["POST_EDIT"] = "post_edit";
    ActivityActionType["POST_DELETE"] = "post_delete";
    ActivityActionType["POST_VIEW"] = "post_view";
    ActivityActionType["POST_LIKE"] = "post_like";
    ActivityActionType["POST_UNLIKE"] = "post_unlike";
    ActivityActionType["POST_SHARE"] = "post_share";
    ActivityActionType["POST_SAVE"] = "post_save";
    ActivityActionType["POST_UNSAVE"] = "post_unsave";
    ActivityActionType["POST_PIN"] = "post_pin";
    ActivityActionType["POST_UNPIN"] = "post_unpin";
    ActivityActionType["POST_REPORT"] = "post_report";
    ActivityActionType["COMMENT_CREATE"] = "comment_create";
    ActivityActionType["COMMENT_EDIT"] = "comment_edit";
    ActivityActionType["COMMENT_DELETE"] = "comment_delete";
    ActivityActionType["COMMENT_LIKE"] = "comment_like";
    ActivityActionType["COMMENT_UNLIKE"] = "comment_unlike";
    ActivityActionType["COMMENT_REPLY"] = "comment_reply";
    ActivityActionType["USER_FOLLOW"] = "user_follow";
    ActivityActionType["USER_UNFOLLOW"] = "user_unfollow";
    ActivityActionType["USER_BLOCK"] = "user_block";
    ActivityActionType["USER_UNBLOCK"] = "user_unblock";
    ActivityActionType["PROFILE_VIEW"] = "profile_view";
    ActivityActionType["PROFILE_EDIT"] = "profile_edit";
    ActivityActionType["MEDIA_UPLOAD"] = "media_upload";
    ActivityActionType["MEDIA_VIEW"] = "media_view";
    ActivityActionType["VIDEO_PLAY"] = "video_play";
    ActivityActionType["VIDEO_COMPLETE"] = "video_complete";
    ActivityActionType["LOGIN"] = "login";
    ActivityActionType["LOGOUT"] = "logout";
    ActivityActionType["PASSWORD_CHANGE"] = "password_change";
    ActivityActionType["SEARCH"] = "search";
    ActivityActionType["NOTIFICATION_VIEW"] = "notification_view";
    ActivityActionType["NOTIFICATION_CLICK"] = "notification_click";
})(ActivityActionType || (exports.ActivityActionType = ActivityActionType = {}));
let UserActivity = class UserActivity {
    id;
    userId;
    user;
    actionType;
    targetType;
    targetId;
    sessionId;
    metadata;
    clientTimestamp;
    createdAt;
};
exports.UserActivity = UserActivity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserActivity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], UserActivity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserActivity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'action_type',
        type: 'enum',
        enum: ActivityActionType,
    }),
    __metadata("design:type", String)
], UserActivity.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_type', length: 50, nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "targetType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "targetId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'session_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], UserActivity.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], UserActivity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_timestamp', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserActivity.prototype, "clientTimestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserActivity.prototype, "createdAt", void 0);
exports.UserActivity = UserActivity = __decorate([
    (0, typeorm_1.Entity)('user_activities'),
    (0, typeorm_1.Index)(['userId', 'createdAt']),
    (0, typeorm_1.Index)(['actionType', 'createdAt']),
    (0, typeorm_1.Index)(['targetType', 'targetId', 'createdAt']),
    (0, typeorm_1.Index)(['createdAt'])
], UserActivity);
//# sourceMappingURL=user-activity.entity.js.map