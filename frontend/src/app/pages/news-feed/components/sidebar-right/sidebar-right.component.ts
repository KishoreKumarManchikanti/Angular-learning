import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarPost, TrendingTopic } from '../../news-feed.models';

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.scss',
})
export class SidebarRightComponent {
  @Input() savedPosts: SidebarPost[] = [];
  @Input() trendingTopics: TrendingTopic[] = [];
  @Input() loading = false;

  @Output() postSelected = new EventEmitter<string>();
  @Output() topicSelected = new EventEmitter<string>();

  onPostClick(postId: string): void {
    this.postSelected.emit(postId);
  }

  onTopicClick(topic: string): void {
    this.topicSelected.emit(topic);
  }

  trackByPostId(index: number, post: SidebarPost): string {
    return post.id;
  }

  trackByTopic(index: number, topic: TrendingTopic): string {
    return topic.tag;
  }

  formatCount(count: number): string {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }
}
