import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsPost, Comment } from '../../news-feed.models';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentItemComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss',
})
export class CommentSectionComponent {
  @Input({ required: true }) post!: NewsPost;
  @Input() currentUserId = 'current-user';
  @Input() currentUserAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe';

  @Output() commentAdded = new EventEmitter<string>();
  @Output() replyAdded = new EventEmitter<{ commentId: string; content: string }>();
  @Output() commentDeleted = new EventEmitter<string>();
  @Output() commentLikeToggled = new EventEmitter<string>();

  newCommentText = '';

  submitComment(): void {
    const content = this.newCommentText.trim();
    if (!content) return;
    this.commentAdded.emit(content);
    this.newCommentText = '';
  }

  onReplyAdded(event: { commentId: string; content: string }): void {
    this.replyAdded.emit(event);
  }

  onCommentDeleted(commentId: string): void {
    this.commentDeleted.emit(commentId);
  }

  onCommentLikeToggled(commentId: string): void {
    this.commentLikeToggled.emit(commentId);
  }

  trackByCommentId(index: number, comment: Comment): string {
    return comment.id;
  }
}
