import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV', 'development');
        const isProduction = nodeEnv === 'production';
        const isStaging = nodeEnv === 'staging';

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_DATABASE', 'newsfeed_dev'),
          entities: entities,

          // Auto-sync schema in development only (NEVER in production!)
          synchronize: !isProduction && !isStaging,

          // Logging configuration
          logging:
            nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],

          // Connection pool settings
          extra: {
            // PostgreSQL specific settings
            max: isProduction ? 20 : 5, // Connection pool size
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
          },

          // SSL for production/staging
          ssl:
            isProduction || isStaging ? { rejectUnauthorized: false } : false,

          // Auto load entities
          autoLoadEntities: true,

          // Retry settings
          retryAttempts: isProduction ? 10 : 3,
          retryDelay: 3000,
        };
      },
    }),

    // Register all entities for repository injection
    TypeOrmModule.forFeature(entities),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
