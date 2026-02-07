// Environment configuration types
export interface DatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  ssl?: boolean;
}

export interface StorageConfig {
  provider: 'local' | 's3' | 'minio';
  bucket: string;
  region?: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  cdnUrl?: string;
  localPath?: string;
  presignedUrlExpiry: number; // in seconds
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

export interface AppConfig {
  nodeEnv: 'development' | 'staging' | 'production';
  port: number;
  apiPrefix: string;
  corsOrigins: string[];
  jwtSecret: string;
  jwtExpiresIn: string;
}

export interface EnvironmentConfig {
  app: AppConfig;
  database: DatabaseConfig;
  storage: StorageConfig;
  redis: RedisConfig;
}

// Helper to get config from environment
export const getConfig = (): EnvironmentConfig => {
  const nodeEnv = (process.env.NODE_ENV || 'development') as
    | 'development'
    | 'staging'
    | 'production';

  return {
    app: {
      nodeEnv,
      port: parseInt(process.env.PORT || '3000', 10),
      apiPrefix: process.env.API_PREFIX || 'api',
      corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:4200').split(
        ',',
      ),
      jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    database: {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'newsfeed_dev',
      synchronize: nodeEnv === 'development',
      logging: nodeEnv === 'development',
      ssl: process.env.DB_SSL === 'true',
    },
    storage: getStorageConfig(nodeEnv),
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0', 10),
    },
  };
};

// Storage configuration based on environment
const getStorageConfig = (nodeEnv: string): StorageConfig => {
  switch (nodeEnv) {
    case 'production':
      return {
        provider: 's3',
        bucket: process.env.AWS_S3_BUCKET || 'newsfeed-media-prod',
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        cdnUrl:
          process.env.CDN_URL ||
          `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`,
        presignedUrlExpiry: 900, // 15 minutes
      };

    case 'staging':
      return {
        provider: 's3',
        bucket: process.env.AWS_S3_BUCKET || 'newsfeed-media-staging',
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        cdnUrl: process.env.CDN_URL,
        presignedUrlExpiry: 900,
      };

    case 'development':
    default:
      return {
        provider: 'minio',
        bucket: process.env.MINIO_BUCKET || 'newsfeed-media-dev',
        endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
        accessKeyId: process.env.MINIO_ACCESS_KEY || 'minioadmin',
        secretAccessKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
        cdnUrl: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
        presignedUrlExpiry: 3600, // 1 hour for dev
      };
  }
};

export default getConfig;
