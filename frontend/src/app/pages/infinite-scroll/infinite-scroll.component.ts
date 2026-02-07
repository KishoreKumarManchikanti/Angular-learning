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

interface FeedPost {
  id: number;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked: boolean;
}

interface ScrollMetrics {
  totalLoaded: number;
  loadCount: number;
  lastLoadTime: number;
}

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss',
})
export class InfiniteScrollComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  @ViewChild('loadTrigger') loadTrigger!: ElementRef<HTMLDivElement>;

  // Signals for reactive state
  posts = signal<FeedPost[]>([]);
  isLoading = signal(false);
  hasMore = signal(true);
  error = signal<string | null>(null);
  metrics = signal<ScrollMetrics>({
    totalLoaded: 0,
    loadCount: 0,
    lastLoadTime: 0,
  });

  // Computed values
  totalPosts = computed(() => this.posts().length);
  loadedBatches = computed(() => this.metrics().loadCount);

  // Configuration
  readonly POSTS_PER_LOAD = 5;
  readonly MAX_POSTS = 50;
  readonly SIMULATED_DELAY = 1500; // ms

  // Sample data generators
  private readonly usernames = [
    'travel_adventures',
    'foodie_life',
    'tech_wizard',
    'nature_lover',
    'fitness_guru',
    'art_gallery',
    'music_vibes',
    'coffee_addict',
    'pet_paradise',
    'urban_explorer',
    'sunset_chaser',
    'book_worm',
  ];

  private readonly captions = [
    'Living my best life! ✨ #blessed',
    'Another day, another adventure 🌍',
    'Good vibes only 🌈',
    'Making memories that last forever 📸',
    'Chase your dreams, not people 💫',
    'Sunday funday! Who else is relaxing? 😎',
    'This view though... 😍',
    'When life gives you lemons, take a photo 🍋',
    'Exploring hidden gems today 💎',
    'Coffee first, adulting second ☕',
    'Plot twist: Everything worked out 🎉',
    'Currently accepting applications for adventure buddies 🏔️',
  ];

  private readonly imageCategories = [
    'nature',
    'city',
    'food',
    'travel',
    'architecture',
    'animals',
    'people',
    'technology',
    'art',
    'sports',
  ];

  ngOnInit(): void {
    // Load initial posts
    this.loadMorePosts();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: '100px', // Load before reaching the bottom
      threshold: 0.1,
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
    this.error.set(null);
    const startTime = performance.now();

    // Simulate API call
    setTimeout(() => {
      try {
        const currentCount = this.posts().length;

        if (currentCount >= this.MAX_POSTS) {
          this.hasMore.set(false);
          this.isLoading.set(false);
          return;
        }

        const newPosts = this.generatePosts(currentCount, this.POSTS_PER_LOAD);

        this.posts.update((current) => [...current, ...newPosts]);

        const loadTime = performance.now() - startTime;
        this.metrics.update((m) => ({
          totalLoaded: m.totalLoaded + newPosts.length,
          loadCount: m.loadCount + 1,
          lastLoadTime: Math.round(loadTime),
        }));

        if (this.posts().length >= this.MAX_POSTS) {
          this.hasMore.set(false);
        }
      } catch (e) {
        this.error.set('Failed to load posts. Please try again.');
      } finally {
        this.isLoading.set(false);
      }
    }, this.SIMULATED_DELAY);
  }

  private generatePosts(startId: number, count: number): FeedPost[] {
    const posts: FeedPost[] = [];

    for (let i = 0; i < count; i++) {
      const id = startId + i + 1;
      const username = this.usernames[Math.floor(Math.random() * this.usernames.length)];
      const category =
        this.imageCategories[Math.floor(Math.random() * this.imageCategories.length)];

      posts.push({
        id,
        username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        image: `https://picsum.photos/seed/${id}/600/600`,
        caption: this.captions[Math.floor(Math.random() * this.captions.length)],
        likes: Math.floor(Math.random() * 10000) + 100,
        comments: Math.floor(Math.random() * 500) + 10,
        timeAgo: this.getRandomTimeAgo(),
        liked: false,
      });
    }

    return posts;
  }

  private getRandomTimeAgo(): string {
    const units = ['m', 'h', 'd'];
    const unit = units[Math.floor(Math.random() * units.length)];
    const value = Math.floor(Math.random() * 23) + 1;

    switch (unit) {
      case 'm':
        return `${value} minutes ago`;
      case 'h':
        return `${value} hours ago`;
      case 'd':
        return `${value} days ago`;
      default:
        return 'Just now';
    }
  }

  toggleLike(post: FeedPost): void {
    this.posts.update((posts) =>
      posts.map((p) =>
        p.id === post.id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p,
      ),
    );
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  retryLoad(): void {
    this.error.set(null);
    this.loadMorePosts();
  }

  resetFeed(): void {
    this.posts.set([]);
    this.hasMore.set(true);
    this.error.set(null);
    this.metrics.set({
      totalLoaded: 0,
      loadCount: 0,
      lastLoadTime: 0,
    });
    this.loadMorePosts();
  }
}
