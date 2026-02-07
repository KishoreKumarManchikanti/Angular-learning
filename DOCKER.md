# Docker Guide for News Feed Application

This guide covers Docker basics and how to run the application's containerized services.

---

## Table of Contents

1. [Docker Basics](#docker-basics)
2. [Application Services](#application-services)
3. [Quick Start](#quick-start)
4. [Common Docker Commands](#common-docker-commands)
5. [Docker Compose Commands](#docker-compose-commands)
6. [Troubleshooting](#troubleshooting)

---

## Docker Basics

### What is Docker?

Docker is a platform for developing, shipping, and running applications in **containers**. Containers are lightweight, standalone, executable packages that include everything needed to run an application: code, runtime, libraries, and system tools.

### Key Concepts

| Concept            | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| **Image**          | A read-only template with instructions for creating a container (like a blueprint) |
| **Container**      | A running instance of an image (the actual running application)                    |
| **Dockerfile**     | A text file with instructions to build a Docker image                              |
| **Docker Compose** | A tool for defining and running multi-container applications                       |
| **Volume**         | Persistent storage for container data that survives container restarts             |
| **Network**        | Virtual network allowing containers to communicate with each other                 |

### Docker Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Docker Host                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Container 1 │  │ Container 2 │  │ Container 3 │     │
│  │  (postgres) │  │   (redis)   │  │   (minio)   │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│  ┌──────┴────────────────┴────────────────┴──────┐     │
│  │              Docker Network                    │     │
│  └────────────────────────────────────────────────┘     │
│         │                │                │             │
│  ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐     │
│  │   Volume    │  │   Volume    │  │   Volume    │     │
│  │ (pg_data)   │  │(redis_data) │  │(minio_data) │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## Application Services

This application uses the following Docker services to create a complete development environment:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        News Feed Application Stack                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌───────────┐   │
│   │   Angular   │    │   NestJS    │    │  PostgreSQL │    │   Redis   │   │
│   │  Frontend   │───▶│   Backend   │───▶│  Database   │    │   Cache   │   │
│   │  (Port 4200)│    │ (Port 3000) │    │ (Port 5432) │    │(Port 6379)│   │
│   └─────────────┘    └──────┬──────┘    └─────────────┘    └───────────┘   │
│                             │                                               │
│                             ▼                                               │
│                      ┌─────────────┐    ┌─────────────┐                    │
│                      │    MinIO    │    │   pgAdmin   │                    │
│                      │   Storage   │    │  DB Admin   │                    │
│                      │(Port 9000/1)│    │ (Port 5050) │                    │
│                      └─────────────┘    └─────────────┘                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 1. PostgreSQL (Primary Database)

| Property      | Value                |
| ------------- | -------------------- |
| **Image**     | `postgres:17-alpine` |
| **Container** | `newsfeed-postgres`  |
| **Port**      | `5432`               |
| **Volume**    | `postgres_data`      |

#### Why PostgreSQL?

PostgreSQL is the **primary relational database** for storing all application data:

| Data Stored         | Description                                    |
| ------------------- | ---------------------------------------------- |
| **Users**           | User accounts, profiles, authentication data   |
| **Posts**           | News feed posts with content, media references |
| **Comments**        | Threaded comments with replies                 |
| **Likes**           | Post and comment likes                         |
| **Follows**         | User follow relationships                      |
| **Notifications**   | User notifications                             |
| **Tags/Categories** | Content organization                           |
| **Media Metadata**  | References to files stored in MinIO            |

#### Why We Need It

- **ACID Compliance**: Guarantees data integrity for critical operations (payments, user data)
- **Complex Queries**: Supports JOINs, aggregations for news feed algorithms
- **JSON Support**: Can store flexible data structures when needed
- **Scalability**: Handles millions of records efficiently with proper indexing
- **TypeORM Integration**: Works seamlessly with NestJS backend

#### Credentials

```
Host: localhost
Port: 5432
User: postgres
Password: postgres
Database: newsfeed_dev
```

---

### 2. Redis (Caching & Sessions)

| Property      | Value              |
| ------------- | ------------------ |
| **Image**     | `redis:7.4-alpine` |
| **Container** | `newsfeed-redis`   |
| **Port**      | `6379`             |
| **Volume**    | `redis_data`       |

#### Why Redis?

Redis is an **in-memory data store** used for:

| Use Case                 | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| **API Response Caching** | Cache frequently accessed data (trending posts, user profiles) |
| **Session Storage**      | Store user sessions for authentication                         |
| **Rate Limiting**        | Track API request counts per user/IP                           |
| **Real-time Features**   | Pub/Sub for live notifications                                 |
| **Job Queues**           | Background task processing (email sending, image processing)   |
| **Leaderboards**         | Sorted sets for trending content                               |

#### Why We Need It

- **Speed**: 100,000+ read/write operations per second
- **Reduced DB Load**: Prevents repeated expensive database queries
- **Session Management**: Stateless backend with centralized sessions
- **Scalability**: Offloads work from PostgreSQL

#### Performance Impact

| Without Redis               | With Redis               |
| --------------------------- | ------------------------ |
| Every request hits database | Cached responses in ~1ms |
| Session stored in DB        | Session lookup instant   |
| No rate limiting            | Protection against abuse |

```
Host: localhost
Port: 6379
No password (development)
```

---

### 3. MinIO (Object Storage / S3-Compatible)

| Property         | Value                |
| ---------------- | -------------------- |
| **Image**        | `minio/minio:latest` |
| **Container**    | `newsfeed-minio`     |
| **API Port**     | `9000`               |
| **Console Port** | `9001`               |
| **Volume**       | `minio_data`         |

#### Why MinIO?

MinIO provides **S3-compatible object storage** for media files:

| Files Stored  | Description                               |
| ------------- | ----------------------------------------- |
| **Images**    | Post images, profile pictures, thumbnails |
| **Videos**    | User-uploaded videos, video thumbnails    |
| **Documents** | Attachments, PDFs                         |
| **Avatars**   | User profile images                       |

#### Why We Need It

- **S3 Compatible**: Same API as AWS S3 - easy production migration
- **Scalable Storage**: Handles unlimited file sizes and counts
- **Direct Uploads**: Frontend can upload directly to MinIO (reduces backend load)
- **CDN Ready**: Serve static files efficiently
- **Cost Effective**: Free for development, cheap S3 for production

#### Why Not Store in PostgreSQL?

| PostgreSQL (BLOB) | MinIO/S3                   |
| ----------------- | -------------------------- |
| Database bloat    | Separate scalable storage  |
| Slow backups      | Independent backup/restore |
| No CDN support    | CDN-friendly URLs          |
| Complex streaming | Built-in streaming         |

#### Access

```
API Endpoint: http://localhost:9000
Console: http://localhost:9001
Access Key: minioadmin
Secret Key: minioadmin
Bucket: newsfeed-media-dev
```

---

### 4. MinIO Init (Bucket Initialization)

| Property      | Value                   |
| ------------- | ----------------------- |
| **Image**     | `minio/mc:latest`       |
| **Container** | `newsfeed-minio-init`   |
| **Type**      | One-time initialization |

#### Why This Container?

This is a **helper container** that runs once on startup to:

1. Wait for MinIO to be healthy
2. Create the `newsfeed-media-dev` bucket
3. Set public download permissions
4. Exit after completion

#### Why We Need It

- **Automation**: No manual bucket creation needed
- **Consistency**: Same setup across all developer machines
- **Idempotent**: Safe to run multiple times (`--ignore-existing`)

---

### 5. pgAdmin (Database Administration GUI)

| Property      | Value                   |
| ------------- | ----------------------- |
| **Image**     | `dpage/pgadmin4:latest` |
| **Container** | `newsfeed-pgadmin`      |
| **Port**      | `5050`                  |
| **Volume**    | `pgadmin_data`          |

#### Why pgAdmin?

pgAdmin is a **web-based database administration tool**:

| Feature                  | Description                          |
| ------------------------ | ------------------------------------ |
| **Visual Query Builder** | Build SQL queries with GUI           |
| **Schema Browser**       | Explore tables, columns, indexes     |
| **Data Editor**          | View and edit table data directly    |
| **Query Tool**           | Execute SQL with syntax highlighting |
| **ERD Viewer**           | Visualize database relationships     |
| **Backup/Restore**       | GUI for database backups             |

#### Why We Need It

- **Debugging**: Quickly inspect data during development
- **No CLI Required**: Visual interface for non-SQL developers
- **Query Testing**: Test complex queries before adding to code
- **Data Seeding**: Manually insert test data

#### Access

```
URL: http://localhost:5050
Email: admin@admin.com
Password: admin
```

#### Connecting to Database in pgAdmin

1. Open http://localhost:5050
2. Right-click "Servers" → "Register" → "Server"
3. General tab: Name = `Local Dev`
4. Connection tab:
   - Host: `host.docker.internal` (or `postgres` if using Docker network)
   - Port: `5432`
   - Database: `newsfeed_dev`
   - Username: `postgres`
   - Password: `postgres`

---

## Service Dependencies

```
┌─────────────────────────────────────────────────────────────┐
│                    Startup Order                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. postgres ──────────────┬──────────────▶ pgadmin         │
│         │                  │                                │
│         │ (healthcheck)    │                                │
│         ▼                  │                                │
│  2. redis                  │                                │
│                            │                                │
│  3. minio ─────────────────┤                                │
│         │                  │                                │
│         │ (healthcheck)    │                                │
│         ▼                  │                                │
│  4. minio-init ────────────┘                                │
│         │                                                   │
│         └──▶ (exits after bucket creation)                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Why Docker for Development?

| Benefit               | Explanation                                    |
| --------------------- | ---------------------------------------------- |
| **Consistency**       | Same environment across all developer machines |
| **Isolation**         | Services don't interfere with host system      |
| **Easy Setup**        | One command starts everything                  |
| **Clean Teardown**    | Remove everything without leftovers            |
| **Version Control**   | docker-compose.yml is committed to repo        |
| **Production Parity** | Similar setup to production environment        |

---

## Resource Usage (Approximate)

| Service    | Memory      | CPU      | Disk           |
| ---------- | ----------- | -------- | -------------- |
| PostgreSQL | ~100-200 MB | Low      | ~50 MB + data  |
| Redis      | ~50-100 MB  | Very Low | ~10 MB + data  |
| MinIO      | ~100-200 MB | Low      | ~50 MB + files |
| pgAdmin    | ~200-400 MB | Low      | ~100 MB        |
| **Total**  | ~500-900 MB | Low      | ~200 MB base   |

---

### Service Comparison: Development vs Production

| Service    | Development (Docker) | Production                     |
| ---------- | -------------------- | ------------------------------ |
| PostgreSQL | Local container      | AWS RDS / Cloud SQL            |
| Redis      | Local container      | AWS ElastiCache / Redis Cloud  |
| MinIO      | Local container      | AWS S3 / Cloud Storage         |
| pgAdmin    | Local container      | Not needed (use cloud console) |

---

## Quick Start

### Prerequisites

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop
2. Verify installation:
   ```bash
   docker --version
   docker compose version
   ```

### Start All Services

```bash
# Navigate to backend directory
cd backend

# Start all containers in detached mode
docker compose up -d

# View running containers
docker compose ps
```

### Stop All Services

```bash
# Stop containers (keeps data)
docker compose stop

# Stop and remove containers (keeps volumes/data)
docker compose down

# Stop and remove everything including data
docker compose down -v
```

### Start Individual Services

```bash
# Start only PostgreSQL
docker compose up -d postgres

# Start PostgreSQL and Redis
docker compose up -d postgres redis
```

---

## Common Docker Commands

### Container Management

| Command                      | Description                             |
| ---------------------------- | --------------------------------------- |
| `docker ps`                  | List running containers                 |
| `docker ps -a`               | List all containers (including stopped) |
| `docker start <container>`   | Start a stopped container               |
| `docker stop <container>`    | Stop a running container                |
| `docker restart <container>` | Restart a container                     |
| `docker rm <container>`      | Remove a stopped container              |
| `docker rm -f <container>`   | Force remove a running container        |

### Image Management

| Command               | Description                     |
| --------------------- | ------------------------------- |
| `docker images`       | List all images                 |
| `docker pull <image>` | Download an image from registry |
| `docker rmi <image>`  | Remove an image                 |
| `docker image prune`  | Remove unused images            |

### Container Inspection

| Command                              | Description                             |
| ------------------------------------ | --------------------------------------- |
| `docker logs <container>`            | View container logs                     |
| `docker logs -f <container>`         | Follow/stream container logs            |
| `docker logs --tail 100 <container>` | View last 100 log lines                 |
| `docker inspect <container>`         | View detailed container info            |
| `docker stats`                       | View real-time container resource usage |

### Execute Commands in Containers

| Command                             | Description                  |
| ----------------------------------- | ---------------------------- |
| `docker exec -it <container> bash`  | Open bash shell in container |
| `docker exec -it <container> sh`    | Open sh shell in container   |
| `docker exec <container> <command>` | Run a command in container   |

### Volume Management

| Command                          | Description           |
| -------------------------------- | --------------------- |
| `docker volume ls`               | List all volumes      |
| `docker volume inspect <volume>` | View volume details   |
| `docker volume rm <volume>`      | Remove a volume       |
| `docker volume prune`            | Remove unused volumes |

### Network Management

| Command                            | Description          |
| ---------------------------------- | -------------------- |
| `docker network ls`                | List all networks    |
| `docker network inspect <network>` | View network details |
| `docker network create <name>`     | Create a new network |
| `docker network rm <network>`      | Remove a network     |

### System Cleanup

| Command                  | Description                               |
| ------------------------ | ----------------------------------------- |
| `docker system df`       | Show Docker disk usage                    |
| `docker system prune`    | Remove unused data                        |
| `docker system prune -a` | Remove all unused data (including images) |

---

## Docker Compose Commands

| Command                               | Description                               |
| ------------------------------------- | ----------------------------------------- |
| `docker compose up`                   | Create and start containers               |
| `docker compose up -d`                | Start containers in background (detached) |
| `docker compose up --build`           | Rebuild images and start containers       |
| `docker compose down`                 | Stop and remove containers                |
| `docker compose down -v`              | Stop, remove containers AND volumes       |
| `docker compose ps`                   | List containers in the compose project    |
| `docker compose logs`                 | View logs from all containers             |
| `docker compose logs -f <service>`    | Follow logs for a specific service        |
| `docker compose exec <service> <cmd>` | Execute command in running service        |
| `docker compose restart <service>`    | Restart a specific service                |
| `docker compose pull`                 | Pull latest images                        |
| `docker compose config`               | Validate and view compose configuration   |

---

## Service-Specific Commands

### PostgreSQL

```bash
# Connect to PostgreSQL CLI
docker exec -it newsfeed-postgres psql -U postgres -d newsfeed_dev

# List databases
docker exec -it newsfeed-postgres psql -U postgres -c "\l"

# List tables
docker exec -it newsfeed-postgres psql -U postgres -d newsfeed_dev -c "\dt"

# Run SQL file
docker exec -i newsfeed-postgres psql -U postgres -d newsfeed_dev < script.sql

# Backup database
docker exec newsfeed-postgres pg_dump -U postgres newsfeed_dev > backup.sql

# Restore database
docker exec -i newsfeed-postgres psql -U postgres -d newsfeed_dev < backup.sql
```

### Redis

```bash
# Connect to Redis CLI
docker exec -it newsfeed-redis redis-cli

# Check Redis is working
docker exec -it newsfeed-redis redis-cli ping

# List all keys
docker exec -it newsfeed-redis redis-cli keys '*'

# Flush all data (careful!)
docker exec -it newsfeed-redis redis-cli flushall
```

### MinIO

```bash
# View logs
docker logs newsfeed-minio

# Access MinIO Console
# Open: http://localhost:9001
# Login: minioadmin / minioadmin
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check container logs
docker logs <container_name>

# Check if port is already in use
lsof -i :5432  # Check PostgreSQL port
lsof -i :6379  # Check Redis port

# Kill process using the port
kill -9 <PID>
```

### Connection Refused

```bash
# Ensure container is running
docker ps | grep postgres

# Check container health
docker inspect --format='{{.State.Health.Status}}' newsfeed-postgres

# Test connection from host
nc -zv localhost 5432
```

### Out of Disk Space

```bash
# Check Docker disk usage
docker system df

# Clean up unused resources
docker system prune -a --volumes
```

### Reset Everything

```bash
# Stop and remove all containers, networks, volumes
docker compose down -v

# Remove all related images
docker rmi postgres:16-alpine redis:7-alpine minio/minio:latest dpage/pgadmin4:latest

# Start fresh
docker compose up -d
```

### View Container Resource Usage

```bash
# Real-time stats
docker stats

# One-time stats
docker stats --no-stream
```

---

## Environment Variables

The application expects these environment variables when connecting to Docker services:

```env
# PostgreSQL
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=newsfeed_dev

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=newsfeed-media-dev
```

---

## Useful Aliases

Add these to your `~/.zshrc` or `~/.bashrc`:

```bash
# Docker shortcuts
alias dps='docker ps'
alias dpsa='docker ps -a'
alias dlog='docker logs -f'
alias dexec='docker exec -it'
alias dstop='docker stop $(docker ps -q)'
alias dclean='docker system prune -af'

# Docker Compose shortcuts
alias dc='docker compose'
alias dcu='docker compose up -d'
alias dcd='docker compose down'
alias dcl='docker compose logs -f'
alias dcps='docker compose ps'
alias dcr='docker compose restart'

# Application-specific
alias dbstart='cd ~/Downloads/Project/angular-ssr/backend && docker compose up -d'
alias dbstop='cd ~/Downloads/Project/angular-ssr/backend && docker compose down'
alias dblog='docker logs -f newsfeed-postgres'
```

---

## Quick Reference Card

```
┌────────────────────────────────────────────────────────────┐
│                    DOCKER QUICK REFERENCE                  │
├────────────────────────────────────────────────────────────┤
│ START SERVICES:     docker compose up -d                   │
│ STOP SERVICES:      docker compose down                    │
│ VIEW CONTAINERS:    docker compose ps                      │
│ VIEW LOGS:          docker compose logs -f <service>       │
│ RESTART SERVICE:    docker compose restart <service>       │
│ SHELL ACCESS:       docker exec -it <container> sh         │
├────────────────────────────────────────────────────────────┤
│                    ACCESS POINTS                           │
├────────────────────────────────────────────────────────────┤
│ PostgreSQL:         localhost:5432                         │
│ Redis:              localhost:6379                         │
│ MinIO API:          localhost:9000                         │
│ MinIO Console:      http://localhost:9001                  │
│ pgAdmin:            http://localhost:5050                  │
└────────────────────────────────────────────────────────────┘
```
