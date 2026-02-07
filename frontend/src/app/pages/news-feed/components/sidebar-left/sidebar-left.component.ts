import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarPost, RecentActivity, formatTimeAgo } from '../../news-feed.models';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.scss',
})
export class SidebarLeftComponent {
  @Input() likedPosts: SidebarPost[] = [];
  @Input() pinnedPosts: SidebarPost[] = [];
  @Input() recentActivity: RecentActivity[] = [];
  @Input() loading = false;

  @Output() postSelected = new EventEmitter<string>();

  formatTimeAgo = formatTimeAgo;

  onPostClick(postId: string): void {
    this.postSelected.emit(postId);
  }

  trackByPostId(index: number, post: SidebarPost): string {
    return post.id;
  }

  trackByActivityId(index: number, activity: RecentActivity): string {
    return activity.id;
  }

  getActivityIcon(type: RecentActivity['type']): string {
    switch (type) {
      case 'comment_on_own':
        return '💬';
      case 'reply_to_comment':
        return '↩️';
      case 'like_on_comment':
        return '❤️';
      default:
        return '📌';
    }
  }

  getActivityLabel(type: RecentActivity['type']): string {
    switch (type) {
      case 'comment_on_own':
        return 'commented on your post';
      case 'reply_to_comment':
        return 'replied to your comment';
      case 'like_on_comment':
        return 'liked your comment';
      default:
        return 'interacted with your content';
    }
  }
}
