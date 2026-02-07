// ============================================
// NEWS FEED DATA MODELS
// ============================================

export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  parentId?: string;
  author: Author;
  content: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  createdAt: Date;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'gif';
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  duration?: number; // For videos (in seconds)
  mimeType?: string;
  // UI state for videos
  isPlaying?: boolean;
  isMuted?: boolean;
  currentTime?: number;
}

export interface NewsPost {
  id: string;
  author: Author;
  title: string;
  content: string;
  media: MediaItem[];
  category: string;
  timestamp: Date;
  likes: number;
  commentsCount: number;
  shares: number;
  bookmarks: number;
  isLiked: boolean;
  isPinned: boolean;
  isSaved: boolean;
  // Comments state
  showComments: boolean;
  commentsLoaded: boolean;
  comments: Comment[];
  commentsLoading: boolean;
}

// Sidebar types
export interface SidebarPost {
  id: string;
  title: string;
  author: Author;
}

export interface GroupedInteractions {
  liked: SidebarPost[];
  pinned: SidebarPost[];
  saved: SidebarPost[];
}

export interface RecentActivity {
  id: string;
  type: 'comment_on_own' | 'reply_to_comment' | 'like_on_comment';
  postId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

export interface TrendingTopic {
  tag: string;
  postCount: number;
}

// ============================================
// CATEGORY UTILITIES
// ============================================

export const CATEGORIES = [
  'Technology',
  'Sports',
  'Finance',
  'Health',
  'Travel',
  'Food',
  'Science',
  'Entertainment',
  'Politics',
  'Crypto',
  'General',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_ICONS: Record<string, string> = {
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

export function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category] || '📰';
}

// ============================================
// FORMATTING UTILITIES
// ============================================

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function formatVideoDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
// Alias for compatibility
export const formatTimeAgo = getTimeAgo;
