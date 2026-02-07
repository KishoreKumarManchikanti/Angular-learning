import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';
import * as path from 'path';

export interface UploadResult {
  key: string;
  url: string;
  cdnUrl: string;
  contentType: string;
  size: number;
}

export interface PresignedUrlResult {
  uploadUrl: string;
  key: string;
  cdnUrl: string;
  expiresIn: number;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly cdnUrl: string;
  private readonly presignedUrlExpiry: number;
  private readonly provider: string;

  constructor(private configService: ConfigService) {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');

    // Get storage configuration based on environment
    if (nodeEnv === 'production' || nodeEnv === 'staging') {
      // AWS S3 configuration
      this.provider = 's3';
      this.bucket = this.configService.get<string>('AWS_S3_BUCKET', '');
      this.cdnUrl = this.configService.get<string>('CDN_URL', '');

      this.s3Client = new S3Client({
        region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
        credentials: {
          accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', ''),
          secretAccessKey: this.configService.get<string>(
            'AWS_SECRET_ACCESS_KEY',
            '',
          ),
        },
      });

      this.presignedUrlExpiry = 900; // 15 minutes for production
    } else {
      // MinIO configuration for development
      this.provider = 'minio';
      this.bucket = this.configService.get<string>(
        'MINIO_BUCKET',
        'newsfeed-media-dev',
      );
      const endpoint = this.configService.get<string>(
        'MINIO_ENDPOINT',
        'http://localhost:9000',
      );
      this.cdnUrl = endpoint;

      this.s3Client = new S3Client({
        endpoint: endpoint,
        region: 'us-east-1', // MinIO requires a region, but it's ignored
        credentials: {
          accessKeyId: this.configService.get<string>(
            'MINIO_ACCESS_KEY',
            'minioadmin',
          ),
          secretAccessKey: this.configService.get<string>(
            'MINIO_SECRET_KEY',
            'minioadmin',
          ),
        },
        forcePathStyle: true, // Required for MinIO
      });

      this.presignedUrlExpiry = 3600; // 1 hour for development
    }

    this.logger.log(
      `Storage service initialized with provider: ${this.provider}`,
    );
  }

  /**
   * Generate a unique storage key for the file
   */
  generateKey(
    userId: string,
    filename: string,
    folder: string = 'media',
  ): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const uniqueId = crypto.randomUUID();
    const ext = path.extname(filename).toLowerCase();
    const safeName = path
      .basename(filename, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '_');

    return `${folder}/${year}/${month}/${userId}/${safeName}-${uniqueId}${ext}`;
  }

  /**
   * Generate a presigned URL for direct upload from client
   */
  async getPresignedUploadUrl(
    userId: string,
    filename: string,
    contentType: string,
    folder: string = 'media',
  ): Promise<PresignedUrlResult> {
    const key = this.generateKey(userId, filename, folder);

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: this.presignedUrlExpiry,
    });

    return {
      uploadUrl,
      key,
      cdnUrl: this.getCdnUrl(key),
      expiresIn: this.presignedUrlExpiry,
    };
  }

  /**
   * Generate a presigned URL for downloading/viewing a file
   */
  async getPresignedDownloadUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: this.presignedUrlExpiry,
    });
  }

  /**
   * Upload a file directly from the server
   */
  async upload(
    userId: string,
    buffer: Buffer,
    filename: string,
    contentType: string,
    folder: string = 'media',
  ): Promise<UploadResult> {
    const key = this.generateKey(userId, filename, folder);

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await this.s3Client.send(command);

    return {
      key,
      url: await this.getPresignedDownloadUrl(key),
      cdnUrl: this.getCdnUrl(key),
      contentType,
      size: buffer.length,
    };
  }

  /**
   * Delete a file from storage
   */
  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);
    this.logger.log(`Deleted file: ${key}`);
  }

  /**
   * Check if a file exists
   */
  async exists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      await this.s3Client.send(command);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get the CDN URL for a storage key
   */
  getCdnUrl(key: string): string {
    if (this.cdnUrl) {
      // Remove trailing slash from CDN URL
      const baseUrl = this.cdnUrl.replace(/\/$/, '');

      if (this.provider === 'minio') {
        // MinIO uses bucket in path
        return `${baseUrl}/${this.bucket}/${key}`;
      }

      // CloudFront or S3 direct
      return `${baseUrl}/${key}`;
    }

    // Fallback to S3 URL
    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }

  /**
   * Get thumbnail key from original key
   */
  getThumbnailKey(originalKey: string): string {
    const ext = path.extname(originalKey);
    const base = originalKey.slice(0, -ext.length);
    return `${base}_thumb.jpg`;
  }

  /**
   * Get variant key for responsive images
   */
  getVariantKey(
    originalKey: string,
    variant: 'small' | 'medium' | 'large',
  ): string {
    const ext = path.extname(originalKey);
    const base = originalKey.slice(0, -ext.length);
    return `${base}_${variant}${ext}`;
  }
}
