import { Component, Input, Output, EventEmitter, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  NewsPost,
  MediaItem,
  getCategoryIcon,
  formatNumber,
  formatVideoDuration,
  getTimeAgo,
} from '../../news-feed.models';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  private platformId = inject(PLATFORM_ID);

  @Input({ required: true }) post!: NewsPost;
  @Input() currentUserId = 'current-user';

  @Output() likeToggled = new EventEmitter<void>();
  @Output() pinToggled = new EventEmitter<void>();
  @Output() saveToggled = new EventEmitter<void>();
  @Output() commentsToggled = new EventEmitter<void>();

  // Expose utility functions
  getCategoryIcon = getCategoryIcon;
  formatNumber = formatNumber;
  formatVideoDuration = formatVideoDuration;
  getTimeAgo = getTimeAgo;

  // Action handlers
  onLikeClick(): void {
    this.likeToggled.emit();
  }

  onPinClick(): void {
    this.pinToggled.emit();
  }

  onSaveClick(): void {
    this.saveToggled.emit();
  }

  onCommentsClick(): void {
    this.commentsToggled.emit();
  }

  openMediaViewer(index: number): void {
    console.log('Open media viewer at index:', index);
  }

  // Video control methods
  private getVideoElement(mediaItem: MediaItem): HTMLVideoElement | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return document.querySelector(`video[data-media-id="${mediaItem.id}"]`) as HTMLVideoElement;
  }

  toggleVideoPlay(event: Event, mediaItem: MediaItem): void {
    event.stopPropagation();
    const video = this.getVideoElement(mediaItem);
    if (!video) return;

    if (video.paused) {
      this.pauseAllVideos();
      video.play().catch((err) => console.warn('Video play failed:', err));
    } else {
      video.pause();
    }
  }

  onVideoPlay(mediaItem: MediaItem): void {
    mediaItem.isPlaying = true;
  }

  onVideoPause(mediaItem: MediaItem): void {
    mediaItem.isPlaying = false;
  }

  onVideoTimeUpdate(event: Event, mediaItem: MediaItem): void {
    const video = event.target as HTMLVideoElement;
    mediaItem.currentTime = video.currentTime;
    if (!mediaItem.duration) {
      mediaItem.duration = video.duration;
    }
  }

  onVideoEnded(mediaItem: MediaItem): void {
    mediaItem.isPlaying = false;
    mediaItem.currentTime = 0;
  }

  toggleVideoMute(event: Event, mediaItem: MediaItem): void {
    event.stopPropagation();
    const video = this.getVideoElement(mediaItem);
    if (!video) return;
    video.muted = !video.muted;
    mediaItem.isMuted = video.muted;
  }

  seekVideo(event: MouseEvent, mediaItem: MediaItem): void {
    event.stopPropagation();
    const video = this.getVideoElement(mediaItem);
    if (!video) return;
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    video.currentTime = percentage * video.duration;
  }

  getVideoProgress(mediaItem: MediaItem): number {
    if (!mediaItem.duration || mediaItem.duration === 0) return 0;
    return ((mediaItem.currentTime || 0) / mediaItem.duration) * 100;
  }

  toggleFullscreen(event: Event, mediaItem: MediaItem): void {
    event.stopPropagation();
    const video = this.getVideoElement(mediaItem);
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen().catch((err) => console.warn('Fullscreen failed:', err));
    }
  }

  private pauseAllVideos(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const videos = document.querySelectorAll('.post-video') as NodeListOf<HTMLVideoElement>;
    videos.forEach((video) => {
      if (!video.paused) video.pause();
    });
  }
}
