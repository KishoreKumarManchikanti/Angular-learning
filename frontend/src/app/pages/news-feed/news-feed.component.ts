import {
  Component,
  signal,
  computed,
  inject,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Models & Service
import {
  Author,
  NewsPost,
  Comment,
  GroupedInteractions,
  RecentActivity,
  TrendingTopic,
} from './news-feed.models';
import { NewsFeedService } from './news-feed.service';

// Sub-components
import { PostCardComponent } from './components/post-card/post-card.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PostCardComponent,
    CommentSectionComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
  ],
  templateUrl: './news-feed.component.html',
  styleUrl: './news-feed.component.scss',
})
export class NewsFeedComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private newsFeedService = inject(NewsFeedService);
  private observer: IntersectionObserver | null = null;
  private currentPage = 1;

  @ViewChild('loadTrigger') loadTrigger!: ElementRef<HTMLDivElement>;

  // Current user (would come from auth service in production)
  currentUser: Author = {
    id: 'current-user',
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
    verified: false,
  };

  // Feed state
  posts = signal<NewsPost[]>([]);
  isLoading = signal(false);
  hasMore = signal(true);

  // User interactions state
  likedPosts = signal<GroupedInteractions['liked']>([]);
  pinnedPosts = signal<GroupedInteractions['pinned']>([]);
  savedPosts = signal<GroupedInteractions['saved']>([]);
  interactionsLoading = signal(false);

  // Recent activity state
  recentActivity = signal<RecentActivity[]>([]);
  activityLoading = signal(false);

  // Trending topics
  trendingTopics = signal<TrendingTopic[]>([]);
  trendingLoading = signal(false);

  // Computed values
  totalPosts = computed(() => this.posts().length);
  totalLiked = computed(() => this.likedPosts().length);
  totalPinned = computed(() => this.pinnedPosts().length);
  totalSaved = computed(() => this.savedPosts().length);

  // Config
  readonly POSTS_PER_PAGE = 5;

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.setupIntersectionObserver(), 100);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  // ============================================
  // DATA LOADING
  // ============================================

  private loadInitialData(): void {
    this.loadMorePosts();
    this.loadUserInteractions();
    this.loadRecentActivity();
    this.loadTrendingTopics();
  }

  private setupIntersectionObserver(): void {
    this.observer?.disconnect();

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '400px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading() && this.hasMore()) {
          this.loadMorePosts();
        }
      });
    }, options);

    if (this.loadTrigger?.nativeElement) {
      this.observer.observe(this.loadTrigger.nativeElement);
    }
  }

  loadMorePosts(): void {
    if (this.isLoading() || !this.hasMore()) return;

    this.isLoading.set(true);

    this.newsFeedService.getFeed(this.currentPage, this.POSTS_PER_PAGE, this.currentUser.id)
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const newPosts = response.data.data.map((post: any) => this.mapPostFromApi(post));
            this.posts.update((current) => [...current, ...newPosts]);
            this.hasMore.set(response.data.pagination.hasMore);
            this.currentPage++;
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  private loadUserInteractions(): void {
    this.interactionsLoading.set(true);

    this.newsFeedService.getUserInteractions(this.currentUser.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.likedPosts.set(response.data.liked || []);
          this.pinnedPosts.set(response.data.pinned || []);
          this.savedPosts.set(response.data.saved || []);
        }
        this.interactionsLoading.set(false);
      },
      error: () => {
        this.interactionsLoading.set(false);
      },
    });
  }

  private loadRecentActivity(): void {
    this.activityLoading.set(true);

    this.newsFeedService.getRecentActivity(this.currentUser.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.recentActivity.set(response.data);
        }
        this.activityLoading.set(false);
      },
      error: () => {
        this.activityLoading.set(false);
      },
    });
  }

  private loadTrendingTopics(): void {
    this.trendingLoading.set(true);

    this.newsFeedService.getTrendingTopics().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.trendingTopics.set(response.data);
        }
        this.trendingLoading.set(false);
      },
      error: () => {
        this.trendingLoading.set(false);
      },
    });
  }

  // ============================================
  // API MAPPERS
  // ============================================

  private mapPostFromApi(apiPost: any): NewsPost {
    return {
      id: apiPost.id,
      author: {
        id: apiPost.author.id,
        name: apiPost.author.displayName,
        username: apiPost.author.username,
        avatar: apiPost.author.avatar,
        verified: apiPost.author.isVerified,
      },
      title: apiPost.title || apiPost.content?.substring(0, 60) + '...',
      content: apiPost.content,
      media: apiPost.media || (apiPost.imageUrl ? [{
        id: `media-${apiPost.id}`,
        type: 'image' as const,
        url: apiPost.imageUrl,
      }] : []),
      category: apiPost.category,
      timestamp: new Date(apiPost.createdAt),
      likes: apiPost.likesCount,
      commentsCount: apiPost.commentsCount,
      shares: apiPost.sharesCount,
      bookmarks: apiPost.bookmarksCount,
      isLiked: apiPost.isLiked,
      isPinned: apiPost.isPinned,
      isSaved: apiPost.isSaved,
      showComments: false,
      commentsLoaded: false,
      comments: [],
      commentsLoading: false,
    };
  }

  private mapCommentFromApi(apiComment: any): Comment {
    return {
      id: apiComment.id,
      postId: apiComment.postId,
      parentId: apiComment.parentId,
      author: {
        id: apiComment.author.id,
        name: apiComment.author.displayName,
        username: apiComment.author.username,
        avatar: apiComment.author.avatar,
        verified: apiComment.author.isVerified,
      },
      content: apiComment.content,
      likes: apiComment.likesCount,
      isLiked: apiComment.isLiked,
      replies: (apiComment.replies || []).map((r: any) => this.mapCommentFromApi(r)),
      createdAt: new Date(apiComment.createdAt),
    };
  }

  // ============================================
  // POST ACTIONS (from PostCardComponent)
  // ============================================

  onLikeToggled(post: NewsPost): void {
    // Optimistic update
    this.posts.update((posts) =>
      posts.map((p) =>
        p.id === post.id
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p,
      ),
    );

    this.newsFeedService.toggleLike(post.id, this.currentUser.id).subscribe({
      error: () => {
        // Revert on error
        this.posts.update((posts) =>
          posts.map((p) =>
            p.id === post.id
              ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
              : p,
          ),
        );
      },
    });
  }

  onPinToggled(post: NewsPost): void {
    this.posts.update((posts) =>
      posts.map((p) => (p.id === post.id ? { ...p, isPinned: !p.isPinned } : p)),
    );

    this.newsFeedService.togglePin(post.id, this.currentUser.id).subscribe({
      error: () => {
        this.posts.update((posts) =>
          posts.map((p) => (p.id === post.id ? { ...p, isPinned: !p.isPinned } : p)),
        );
      },
    });
  }

  onSaveToggled(post: NewsPost): void {
    this.posts.update((posts) =>
      posts.map((p) =>
        p.id === post.id
          ? { ...p, isSaved: !p.isSaved, bookmarks: p.isSaved ? p.bookmarks - 1 : p.bookmarks + 1 }
          : p,
      ),
    );

    this.newsFeedService.toggleSave(post.id, this.currentUser.id).subscribe({
      error: () => {
        this.posts.update((posts) =>
          posts.map((p) =>
            p.id === post.id
              ? { ...p, isSaved: !p.isSaved, bookmarks: p.isSaved ? p.bookmarks - 1 : p.bookmarks + 1 }
              : p,
          ),
        );
      },
    });
  }

  onCommentsToggled(post: NewsPost): void {
    this.posts.update((posts) =>
      posts.map((p) => {
        if (p.id === post.id) {
          const showComments = !p.showComments;
          if (showComments && !p.commentsLoaded) {
            this.loadComments(p.id);
          }
          return { ...p, showComments };
        }
        return p;
      }),
    );
  }

  private loadComments(postId: string): void {
    this.posts.update((posts) =>
      posts.map((p) => (p.id === postId ? { ...p, commentsLoading: true } : p)),
    );

    this.newsFeedService.getComments(postId, this.currentUser.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const comments = response.data.data.map((c: any) => this.mapCommentFromApi(c));
          this.posts.update((posts) =>
            posts.map((p) =>
              p.id === postId
                ? { ...p, comments, commentsLoaded: true, commentsLoading: false }
                : p,
            ),
          );
        }
      },
      error: () => {
        this.posts.update((posts) =>
          posts.map((p) => (p.id === postId ? { ...p, commentsLoading: false } : p)),
        );
      },
    });
  }

  // ============================================
  // COMMENT ACTIONS (from CommentSectionComponent)
  // ============================================

  onCommentAdded(event: { postId: string; content: string }): void {
    const newComment: Comment = {
      id: `comment-temp-${Date.now()}`,
      postId: event.postId,
      author: this.currentUser,
      content: event.content,
      likes: 0,
      isLiked: false,
      replies: [],
      createdAt: new Date(),
    };

    // Optimistic update
    this.posts.update((posts) =>
      posts.map((p) =>
        p.id === event.postId
          ? { ...p, commentsCount: p.commentsCount + 1, comments: [newComment, ...p.comments] }
          : p,
      ),
    );

    this.newsFeedService.createComment(event.postId, event.content, this.currentUser.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Update with real comment from server
          this.posts.update((posts) =>
            posts.map((p) =>
              p.id === event.postId
                ? {
                    ...p,
                    comments: p.comments.map((c) =>
                      c.id === newComment.id ? this.mapCommentFromApi(response.data) : c,
                    ),
                  }
                : p,
            ),
          );
        }
      },
      error: () => {
        // Revert on error
        this.posts.update((posts) =>
          posts.map((p) =>
            p.id === event.postId
              ? {
                  ...p,
                  commentsCount: p.commentsCount - 1,
                  comments: p.comments.filter((c) => c.id !== newComment.id),
                }
              : p,
          ),
        );
      },
    });
  }

  onReplyAdded(event: { postId: string; commentId: string; content: string }): void {
    const newReply: Comment = {
      id: `reply-temp-${Date.now()}`,
      postId: event.postId,
      parentId: event.commentId,
      author: this.currentUser,
      content: event.content,
      likes: 0,
      isLiked: false,
      replies: [],
      createdAt: new Date(),
    };

    this.posts.update((posts) =>
      posts.map((p) =>
        p.id === event.postId
          ? {
              ...p,
              commentsCount: p.commentsCount + 1,
              comments: p.comments.map((c) =>
                c.id === event.commentId ? { ...c, replies: [...c.replies, newReply] } : c,
              ),
            }
          : p,
      ),
    );

    this.newsFeedService
      .createComment(event.postId, event.content, this.currentUser.id, event.commentId)
      .subscribe({
        error: () => {
          // Revert on error
          this.posts.update((posts) =>
            posts.map((p) =>
              p.id === event.postId
                ? {
                    ...p,
                    commentsCount: p.commentsCount - 1,
                    comments: p.comments.map((c) =>
                      c.id === event.commentId
                        ? { ...c, replies: c.replies.filter((r) => r.id !== newReply.id) }
                        : c,
                    ),
                  }
                : p,
            ),
          );
        },
      });
  }

  onCommentDeleted(event: { postId: string; commentId: string }): void {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    // Store original state for potential revert
    const originalPosts = this.posts();

    this.posts.update((posts) =>
      posts.map((p) =>
        p.id === event.postId
          ? {
              ...p,
              commentsCount: p.commentsCount - 1,
              comments: p.comments
                .filter((c) => c.id !== event.commentId)
                .map((c) => ({
                  ...c,
                  replies: c.replies.filter((r) => r.id !== event.commentId),
                })),
            }
          : p,
      ),
    );

    this.newsFeedService.deleteComment(event.commentId, this.currentUser.id).subscribe({
      error: () => {
        this.posts.set(originalPosts);
      },
    });
  }

  onCommentLikeToggled(event: { postId: string; commentId: string }): void {
    this.posts.update((posts) =>
      posts.map((p) =>
        p.id === event.postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === event.commentId
                  ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
                  : {
                      ...c,
                      replies: c.replies.map((r) =>
                        r.id === event.commentId
                          ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 }
                          : r,
                      ),
                    },
              ),
            }
          : p,
      ),
    );

    this.newsFeedService.toggleCommentLike(event.commentId, this.currentUser.id).subscribe();
  }

  // ============================================
  // SIDEBAR ACTIONS
  // ============================================

  onSidebarPostSelected(postId: string): void {
    // Scroll to post or navigate
    const element = document.getElementById(`post-${postId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight');
      setTimeout(() => element.classList.remove('highlight'), 2000);
    }
  }

  onTrendingTopicSelected(topic: string): void {
    // Filter or search by topic
    console.log('Search for topic:', topic);
  }

  // ============================================
  // UTILITIES
  // ============================================

  trackByPostId(index: number, post: NewsPost): string {
    return post.id;
  }

  formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      Technology: '💻',
      Sports: '⚽',
      Finance: '💰',
      Health: '🏥',
      Travel: '✈️',
      Food: '🍕',
      Science: '🔬',
      Entertainment: '🎬',
      Politics: '🏛️',
      Crypto: '₿',
      General: '📰',
    };
    return icons[category] || '📰';
  }
}
