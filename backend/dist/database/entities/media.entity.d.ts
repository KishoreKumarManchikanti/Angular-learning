import { User } from './user.entity';
import { Post } from './post.entity';
export declare enum MediaType {
    IMAGE = "image",
    VIDEO = "video",
    GIF = "gif"
}
export declare enum MediaStatus {
    UPLOADING = "uploading",
    PROCESSING = "processing",
    READY = "ready",
    FAILED = "failed"
}
export declare class Media {
    id: string;
    userId: string;
    user: User;
    postId: string;
    post: Post;
    type: MediaType;
    storageKey: string;
    cdnUrl: string;
    thumbnailUrl: string;
    originalFilename: string;
    mimeType: string;
    fileSize: number;
    width: number;
    height: number;
    durationSeconds: number;
    bitrate: number;
    fps: number;
    status: MediaStatus;
    processingError: string;
    variants: {
        thumbnail?: string;
        small?: string;
        medium?: string;
        large?: string;
        original?: string;
    };
    metadata: {
        blurhash?: string;
        dominantColor?: string;
        exif?: {
            make?: string;
            model?: string;
            aperture?: string;
            exposureTime?: string;
            iso?: number;
            focalLength?: string;
            gps?: {
                lat: number;
                lng: number;
            };
            takenAt?: Date;
        };
        codec?: {
            video?: string;
            audio?: string;
        };
        processedAt?: Date;
        processingDuration?: number;
    };
    viewCount: number;
    orderIndex: number;
    createdAt: Date;
}
