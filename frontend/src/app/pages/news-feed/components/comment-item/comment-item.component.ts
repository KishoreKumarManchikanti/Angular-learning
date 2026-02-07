import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment, formatTimeAgo } from '../../news-feed.models';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss',
})
export class CommentItemComponent {
  @Input({ required: true }) comment!: Comment;
  @Input() currentUserId = 'current-user';
  @Input() currentUserAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe';
  @Input() isReply = false;

  @Output() replyAdded = new EventEmitter<{ commentId: string; content: string }>();
  @Output() deleted = new EventEmitter<string>();
  @Output() likeToggled = new EventEmitter<string>();

  showReplyInput = false;
  replyText = '';

  formatTimeAgo = formatTimeAgo;

  toggleReplyInput(): void {
    this.showReplyInput = !this.showReplyInput;
    if (!this.showReplyInput) {
      this.replyText = '';
    }
  }

  submitReply(): void {
    const content = this.replyText.trim();
    if (!content) return;
    this.replyAdded.emit({ commentId: this.comment.id, content });
    this.replyText = '';
    this.showReplyInput = false;
  }

  onDelete(): void {
    this.deleted.emit(this.comment.id);
  }

  onLikeToggle(): void {
    this.likeToggled.emit(this.comment.id);
  }

  onNestedReply(event: { commentId: string; content: string }): void {
    // Forward nested reply to parent - replies go to root comment
    this.replyAdded.emit(event);
  }

  onNestedDelete(commentId: string): void {
    this.deleted.emit(commentId);
  }

  onNestedLikeToggle(commentId: string): void {
    this.likeToggled.emit(commentId);
  }

  trackByReplyId(index: number, reply: Comment): string {
    return reply.id;
  }

  isOwnComment(): boolean {
    return this.comment.author.id === this.currentUserId;
  }
}
