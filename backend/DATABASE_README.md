# News Feed Backend - Database & Storage Documentation

## Overview

This backend is built with NestJS and uses PostgreSQL for data storage combined with S3-compatible object storage (MinIO for development, AWS S3 for production) for media files.

## Table of Contents

- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Storage System](#storage-system)
- [Environment Configuration](#environment-configuration)
- [Local Development Setup](#local-development-setup)
- [Analytics System](#analytics-system)
- [API Reference](#api-reference)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Application                          │
│                    (Angular SSR Frontend)                           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         NestJS Backend                              │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐                │
│  │   REST API  │  │  WebSocket   │  │   Workers   │                │
│  │  Controllers│  │   Gateway    │  │  (Queues)   │                │
│  └─────────────┘  └──────────────┘  └─────────────┘                │
│         │                 │                 │                       │
│         └─────────────────┼─────────────────┘                       │
│                           ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Service Layer                             │   │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │   │
│  │   │ NewsFeed │  │  Media   │  │Analytics │  │  Auth    │   │   │
│  │   │ Service  │  │ Service  │  │ Service  │  │ Service  │   │   │
│  │   └──────────┘  └──────────┘  └──────────┘  └──────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
         │                   │                    │
         ▼                   ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   PostgreSQL    │  │  S3 / MinIO     │  │     Redis       │
│   (Data Store)  │  │  (Media Store)  │  │    (Cache)      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## Database Schema

### Core Entities

#### Users

| Column          | Type         | Description                                   |
| --------------- | ------------ | --------------------------------------------- |
| id              | UUID         | Primary key                                   |
| username        | VARCHAR(100) | Unique username                               |
| email           | VARCHAR(255) | Unique email                                  |
| password_hash   | VARCHAR(255) | Hashed password                               |
| display_name    | VARCHAR(150) | Display name                                  |
| bio             | TEXT         | User biography                                |
| avatar_url      | VARCHAR(500) | Profile picture URL                           |
| is_verified     | BOOLEAN      | Verification status                           |
| role            | ENUM         | user, moderator, admin, verified_creator      |
| status          | ENUM         | active, inactive, suspended, banned           |
| followers_count | INT          | Denormalized follower count                   |
| following_count | INT          | Denormalized following count                  |
| posts_count     | INT          | Denormalized post count                       |
| preferences     | JSONB        | User settings (theme, notifications, privacy) |
| created_at      | TIMESTAMP    | Account creation date                         |

#### Posts

| Column           | Type      | Description                         |
| ---------------- | --------- | ----------------------------------- |
| id               | UUID      | Primary key                         |
| author_id        | UUID      | Foreign key to users                |
| content          | TEXT      | Post content                        |
| category         | ENUM      | Technology, Sports, Finance, etc.   |
| visibility       | ENUM      | public, followers, private          |
| status           | ENUM      | draft, published, archived, deleted |
| likes_count      | INT       | Denormalized like count             |
| comments_count   | INT       | Denormalized comment count          |
| shares_count     | INT       | Denormalized share count            |
| views_count      | INT       | Denormalized view count             |
| engagement_score | FLOAT     | Calculated engagement score         |
| metadata         | JSONB     | hashtags, mentions, links, location |
| created_at       | TIMESTAMP | Post creation date                  |

#### Comments

| Column        | Type      | Description                   |
| ------------- | --------- | ----------------------------- |
| id            | UUID      | Primary key                   |
| post_id       | UUID      | Foreign key to posts          |
| author_id     | UUID      | Foreign key to users          |
| parent_id     | UUID      | Self-reference for threading  |
| content       | TEXT      | Comment content               |
| depth         | INT       | Nesting level (0 = top-level) |
| likes_count   | INT       | Denormalized like count       |
| replies_count | INT       | Denormalized reply count      |
| is_edited     | BOOLEAN   | Edit status                   |
| created_at    | TIMESTAMP | Comment creation date         |

#### Media

| Column            | Type         | Description                          |
| ----------------- | ------------ | ------------------------------------ |
| id                | UUID         | Primary key                          |
| user_id           | UUID         | Uploader                             |
| post_id           | UUID         | Associated post                      |
| type              | ENUM         | image, video, gif                    |
| storage_key       | VARCHAR(500) | S3/MinIO object key                  |
| cdn_url           | VARCHAR(500) | Public CDN URL                       |
| thumbnail_url     | VARCHAR(500) | Thumbnail for videos                 |
| original_filename | VARCHAR(255) | Original file name                   |
| mime_type         | VARCHAR(100) | MIME type                            |
| file_size         | INT          | Size in bytes                        |
| width             | INT          | Media width                          |
| height            | INT          | Media height                         |
| duration_seconds  | FLOAT        | Video duration                       |
| status            | ENUM         | uploading, processing, ready, failed |
| variants          | JSONB        | Responsive image variants            |
| metadata          | JSONB        | EXIF, blurhash, dominant color       |

### Interaction Entities

| Entity        | Purpose                | Unique Constraint           |
| ------------- | ---------------------- | --------------------------- |
| post_likes    | User likes on posts    | (user_id, post_id)          |
| post_pins     | Pinned posts per user  | (user_id, post_id)          |
| post_saves    | Saved/bookmarked posts | (user_id, post_id)          |
| comment_likes | User likes on comments | (user_id, comment_id)       |
| user_follows  | Follow relationships   | (follower_id, following_id) |

### Analytics Entities

#### user_sessions

Tracks user login sessions for engagement analytics.

- Session duration, page views, device info
- Geographic location (from IP)
- UTM parameters for marketing attribution

#### page_views

Tracks individual page visits.

- Time on page, scroll depth
- Bounce and exit flags
- Performance metrics (load time)

#### post_engagements

Daily aggregated engagement metrics per post.

- Views, likes, comments, shares
- Click metrics (profile, links, media)
- Hourly breakdown for trend analysis

#### user_activities

Event log for all user actions.

- Action type (like, comment, share, etc.)
- Target entity and metadata
- Used for activity feeds and recommendations

#### daily_stats

Pre-aggregated platform-wide daily statistics.

- DAU, new users, content created
- Total engagements, views
- Breakdown by category, country, device

#### trending_metrics

Calculated trending scores for posts.

- Engagement velocity
- Time decay factors
- Category diversification boost

---

## Storage System

### Configuration by Environment

| Environment | Provider            | Configuration                                 |
| ----------- | ------------------- | --------------------------------------------- |
| Development | MinIO               | Local S3-compatible storage at localhost:9000 |
| Staging     | AWS S3              | Staging bucket with optional CDN              |
| Production  | AWS S3 + CloudFront | Production bucket with CDN                    |

### Media Upload Flow

```
1. Client requests presigned URL
   POST /api/media/presigned-url
   { filename: "photo.jpg", contentType: "image/jpeg" }

2. Backend generates presigned S3 URL (valid 15 min)
   Response: { uploadUrl, key, cdnUrl }

3. Client uploads directly to S3/MinIO
   PUT {uploadUrl} with file binary

4. S3 triggers webhook on upload complete

5. Backend processes media:
   - Generate thumbnail (for videos)
   - Create responsive variants (small, medium, large)
   - Extract metadata (EXIF, dimensions, duration)
   - Update media record status to 'ready'

6. Client creates post with media_id
```

### Storage Key Format

```
media/{year}/{month}/{user_id}/{filename}-{uuid}.{ext}

Example:
media/2026/02/550e8400-e29b-41d4-a716/vacation-3f2504e0-4f89.jpg
```

### Responsive Image Variants

| Variant   | Max Width | Use Case                 |
| --------- | --------- | ------------------------ |
| thumbnail | 150px     | Grid thumbnails, avatars |
| small     | 320px     | Mobile list items        |
| medium    | 640px     | Mobile detail view       |
| large     | 1280px    | Desktop detail view      |
| original  | Full      | Download, zoom           |

---

## Environment Configuration

### Development (.env.development)

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=newsfeed_dev

# Storage (MinIO)
STORAGE_PROVIDER=minio
MINIO_ENDPOINT=http://localhost:9000
MINIO_BUCKET=newsfeed-media-dev
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Staging (.env.staging)

```env
NODE_ENV=staging

# Database (use managed PostgreSQL)
DB_HOST=${DB_HOST}
DB_DATABASE=newsfeed_staging
DB_SSL=true

# Storage (AWS S3)
STORAGE_PROVIDER=s3
AWS_REGION=us-east-1
AWS_S3_BUCKET=${AWS_S3_BUCKET_STAGING}
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
```

### Production (.env.production)

```env
NODE_ENV=production

# Database (AWS RDS / Google Cloud SQL)
DB_HOST=${DB_HOST}
DB_DATABASE=newsfeed_production
DB_SSL=true

# Storage (AWS S3 + CloudFront)
STORAGE_PROVIDER=s3
AWS_REGION=${AWS_REGION}
AWS_S3_BUCKET=${AWS_S3_BUCKET}
CDN_URL=${CLOUDFRONT_URL}
```

---

## Local Development Setup

### Prerequisites

- Docker & Docker Compose
- Node.js 18+
- npm or yarn

### Quick Start

```bash
# 1. Start infrastructure services
docker-compose up -d

# 2. Wait for services to be healthy
docker-compose ps

# 3. Install dependencies
npm install

# 4. Copy environment file
cp .env.development .env

# 5. Run migrations (when implemented)
npm run migration:run

# 6. Start development server
npm run start:dev
```

### Service URLs

| Service       | URL                   | Credentials             |
| ------------- | --------------------- | ----------------------- |
| API           | http://localhost:3000 | -                       |
| PostgreSQL    | localhost:5432        | postgres / postgres     |
| Redis         | localhost:6379        | -                       |
| MinIO Console | http://localhost:9001 | minioadmin / minioadmin |
| MinIO API     | http://localhost:9000 | minioadmin / minioadmin |
| pgAdmin       | http://localhost:5050 | admin@admin.com / admin |

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean reset)
docker-compose down -v

# Restart a specific service
docker-compose restart postgres
```

---

## Analytics System

### Data Collection Strategy

1. **Real-time Events**: User activities logged immediately
2. **Batch Aggregation**: Daily stats computed via scheduled jobs
3. **Trending Calculation**: Updated every 5 minutes

### Key Metrics

#### User Engagement

- DAU (Daily Active Users)
- Session duration
- Pages per session
- Retention (Day 1, 7, 30)

#### Content Performance

- Impressions vs. Engagement
- Engagement rate = (likes + comments + shares) / views
- Viral coefficient

#### Trending Algorithm

```typescript
score =
  (likes * 1 + comments * 2 + shares * 3) *
  timeDecayFactor *
  authorFactor *
  categoryBoost;

// Time decay: newer content scores higher
timeDecayFactor = 1 / (1 + hoursOld / 24);

// Author factor: verified creators get boost
authorFactor = isVerified ? 1.2 : 1.0;

// Category boost: for diversification
categoryBoost = categoryIsUnderrepresented ? 1.3 : 1.0;
```

### Analytics Queries Examples

```sql
-- Daily active users trend
SELECT date, active_users
FROM daily_stats
WHERE date >= NOW() - INTERVAL '30 days'
ORDER BY date;

-- Top posts by engagement this week
SELECT p.id, p.content, pe.views, pe.likes, pe.comments,
       (pe.likes + pe.comments * 2 + pe.shares * 3) as engagement_score
FROM posts p
JOIN post_engagements pe ON p.id = pe.post_id
WHERE pe.date >= NOW() - INTERVAL '7 days'
ORDER BY engagement_score DESC
LIMIT 20;

-- User retention cohort
SELECT
  DATE_TRUNC('week', u.created_at) as cohort_week,
  COUNT(DISTINCT u.id) as users,
  COUNT(DISTINCT CASE WHEN u.last_active_at >= u.created_at + INTERVAL '7 days'
        THEN u.id END) as retained_7d,
  COUNT(DISTINCT CASE WHEN u.last_active_at >= u.created_at + INTERVAL '30 days'
        THEN u.id END) as retained_30d
FROM users u
GROUP BY 1
ORDER BY 1;
```

---

## API Reference

### Media Endpoints

```
POST   /api/media/presigned-url     Get presigned URL for upload
POST   /api/media/complete          Mark upload as complete
GET    /api/media/:id               Get media by ID
DELETE /api/media/:id               Delete media
```

### News Feed Endpoints

```
GET    /api/news-feed               Get paginated feed
POST   /api/news-feed               Create new post
GET    /api/news-feed/:id           Get post by ID
PUT    /api/news-feed/:id           Update post
DELETE /api/news-feed/:id           Delete post

POST   /api/news-feed/:id/like      Like post
DELETE /api/news-feed/:id/like      Unlike post
POST   /api/news-feed/:id/pin       Pin post
DELETE /api/news-feed/:id/pin       Unpin post
POST   /api/news-feed/:id/save      Save post
DELETE /api/news-feed/:id/save      Unsave post

GET    /api/news-feed/:id/comments  Get post comments
POST   /api/news-feed/:id/comments  Add comment
PUT    /api/news-feed/comments/:id  Edit comment
DELETE /api/news-feed/comments/:id  Delete comment
POST   /api/news-feed/comments/:id/like    Like comment
DELETE /api/news-feed/comments/:id/like    Unlike comment
```

### Analytics Endpoints (Admin)

```
GET    /api/analytics/dashboard         Dashboard overview
GET    /api/analytics/users             User metrics
GET    /api/analytics/content           Content metrics
GET    /api/analytics/trending          Trending content
GET    /api/analytics/export            Export data (CSV)
```

---

## Performance Considerations

### Database Indexes

Critical indexes for query performance:

```sql
-- Feed queries
CREATE INDEX idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX idx_posts_category_created ON posts(category, created_at DESC);

-- Comment threading
CREATE INDEX idx_comments_post_parent ON comments(post_id, parent_id, created_at);

-- User interactions
CREATE INDEX idx_post_likes_user ON post_likes(user_id, created_at DESC);
CREATE INDEX idx_user_follows_follower ON user_follows(follower_id, status);

-- Analytics (BRIN for time-series)
CREATE INDEX idx_page_views_time USING BRIN ON page_views(viewed_at);
CREATE INDEX idx_activities_time USING BRIN ON user_activities(created_at);
```

### Table Partitioning

For high-volume analytics tables:

```sql
-- Partition user_activities by month
CREATE TABLE user_activities (
  -- columns
) PARTITION BY RANGE (created_at);

CREATE TABLE user_activities_2026_02
  PARTITION OF user_activities
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

### Caching Strategy

| Data              | Cache | TTL    |
| ----------------- | ----- | ------ |
| User profile      | Redis | 5 min  |
| Post details      | Redis | 2 min  |
| Feed (first page) | Redis | 30 sec |
| Trending posts    | Redis | 1 min  |
| Daily stats       | Redis | 1 hour |

---

## Migrations

### Creating a Migration

```bash
# Generate migration from entity changes
npm run migration:generate -- -n AddUserPreferences

# Create empty migration
npm run migration:create -- -n SeedCategories
```

### Running Migrations

```bash
# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

---

## Troubleshooting

### Common Issues

**Database connection refused**

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres
```

**MinIO bucket not found**

```bash
# Recreate bucket
docker-compose up minio-init
```

**Redis connection failed**

```bash
# Test Redis connection
docker-compose exec redis redis-cli ping
```

---

## License

MIT
