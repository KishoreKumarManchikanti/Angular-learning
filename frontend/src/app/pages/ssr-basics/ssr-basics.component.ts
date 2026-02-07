import { Component, PLATFORM_ID, Inject, OnInit, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-ssr-basics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ssr-basics.component.html',
  styleUrl: './ssr-basics.component.scss',
})
export class SsrBasicsComponent implements OnInit {
  platformInfo = signal<string>('');
  renderTime = signal<string>('');
  isBrowser = signal<boolean>(false);
  isServer = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    this.isServer.set(isPlatformServer(this.platformId));
    this.renderTime.set(new Date().toISOString());

    if (isPlatformBrowser(this.platformId)) {
      this.platformInfo.set('🌐 This content was hydrated in the Browser');
    } else {
      this.platformInfo.set('🖥️ This content was rendered on the Server');
    }
  }
}
