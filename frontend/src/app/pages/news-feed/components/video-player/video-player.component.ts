import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaItem } from '../../news-feed.models';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoRef!: ElementRef<HTMLVideoElement>;

  @Input({ required: true }) media!: MediaItem;
  @Input() autoplay = false;
  @Input() muted = true;
  @Input() loop = false;
  @Input() showControls = true;

  @Output() play = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() ended = new EventEmitter<void>();
  @Output() timeUpdate = new EventEmitter<number>();

  isPlaying = false;
  isMuted = true;
  currentTime = 0;
  duration = 0;
  progress = 0;
  volume = 1;
  isFullscreen = false;
  showOverlay = true;

  private hideOverlayTimeout: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    if (this.videoRef?.nativeElement) {
      const video = this.videoRef.nativeElement;
      video.muted = this.muted;
      this.isMuted = this.muted;

      video.addEventListener('loadedmetadata', () => {
        this.duration = video.duration;
      });

      video.addEventListener('timeupdate', () => {
        this.currentTime = video.currentTime;
        this.progress = (video.currentTime / video.duration) * 100;
        this.timeUpdate.emit(video.currentTime);
      });

      video.addEventListener('ended', () => {
        this.isPlaying = false;
        this.showOverlay = true;
        this.ended.emit();
      });

      video.addEventListener('play', () => {
        this.isPlaying = true;
        this.play.emit();
      });

      video.addEventListener('pause', () => {
        this.isPlaying = false;
        this.pause.emit();
      });
    }
  }

  ngOnDestroy(): void {
    this.clearHideOverlayTimeout();
  }

  togglePlay(): void {
    if (!this.videoRef?.nativeElement) return;
    const video = this.videoRef.nativeElement;

    if (video.paused) {
      video.play();
      this.startHideOverlayTimeout();
    } else {
      video.pause();
      this.showOverlay = true;
    }
  }

  toggleMute(): void {
    if (!this.videoRef?.nativeElement) return;
    const video = this.videoRef.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }

  setVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (!this.videoRef?.nativeElement) return;
    const video = this.videoRef.nativeElement;
    video.volume = value;
    this.volume = value;
    this.isMuted = value === 0;
    video.muted = value === 0;
  }

  seek(event: MouseEvent): void {
    if (!this.videoRef?.nativeElement) return;
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const video = this.videoRef.nativeElement;
    video.currentTime = percent * video.duration;
  }

  toggleFullscreen(): void {
    if (!this.videoRef?.nativeElement) return;
    const video = this.videoRef.nativeElement;

    if (!document.fullscreenElement) {
      video
        .requestFullscreen()
        .then(() => {
          this.isFullscreen = true;
        })
        .catch((err) => {
          console.error('Fullscreen error:', err);
        });
    } else {
      document.exitFullscreen().then(() => {
        this.isFullscreen = false;
      });
    }
  }

  onMouseMove(): void {
    this.showOverlay = true;
    this.startHideOverlayTimeout();
  }

  onMouseLeave(): void {
    if (this.isPlaying) {
      this.startHideOverlayTimeout();
    }
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  private startHideOverlayTimeout(): void {
    this.clearHideOverlayTimeout();
    if (this.isPlaying) {
      this.hideOverlayTimeout = setTimeout(() => {
        this.showOverlay = false;
      }, 2500);
    }
  }

  private clearHideOverlayTimeout(): void {
    if (this.hideOverlayTimeout) {
      clearTimeout(this.hideOverlayTimeout);
      this.hideOverlayTimeout = null;
    }
  }
}
