import { User } from '../user.entity';
export declare enum ActivityActionType {
    POST_CREATE = "post_create",
    POST_EDIT = "post_edit",
    POST_DELETE = "post_delete",
    POST_VIEW = "post_view",
    POST_LIKE = "post_like",
    POST_UNLIKE = "post_unlike",
    POST_SHARE = "post_share",
    POST_SAVE = "post_save",
    POST_UNSAVE = "post_unsave",
    POST_PIN = "post_pin",
    POST_UNPIN = "post_unpin",
    POST_REPORT = "post_report",
    COMMENT_CREATE = "comment_create",
    COMMENT_EDIT = "comment_edit",
    COMMENT_DELETE = "comment_delete",
    COMMENT_LIKE = "comment_like",
    COMMENT_UNLIKE = "comment_unlike",
    COMMENT_REPLY = "comment_reply",
    USER_FOLLOW = "user_follow",
    USER_UNFOLLOW = "user_unfollow",
    USER_BLOCK = "user_block",
    USER_UNBLOCK = "user_unblock",
    PROFILE_VIEW = "profile_view",
    PROFILE_EDIT = "profile_edit",
    MEDIA_UPLOAD = "media_upload",
    MEDIA_VIEW = "media_view",
    VIDEO_PLAY = "video_play",
    VIDEO_COMPLETE = "video_complete",
    LOGIN = "login",
    LOGOUT = "logout",
    PASSWORD_CHANGE = "password_change",
    SEARCH = "search",
    NOTIFICATION_VIEW = "notification_view",
    NOTIFICATION_CLICK = "notification_click"
}
export declare class UserActivity {
    id: string;
    userId: string;
    user: User;
    actionType: ActivityActionType;
    targetType: string;
    targetId: string;
    sessionId: string;
    metadata: {
        searchQuery?: string;
        searchResultsCount?: number;
        mediaType?: string;
        videoDuration?: number;
        videoWatchTime?: number;
        postCategory?: string;
        postAuthorId?: string;
        pageFrom?: string;
        pageTo?: string;
        deviceType?: string;
        country?: string;
        [key: string]: any;
    };
    clientTimestamp: Date;
    createdAt: Date;
}
