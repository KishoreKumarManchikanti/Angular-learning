import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-render-modes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './render-modes.component.html',
  styleUrl: './render-modes.component.scss',
})
export class RenderModesComponent {
  codeExamples = {
    serverRoutes: `// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender  // Static at build time
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Server     // Dynamic on each request
  },
  {
    path: 'settings',
    renderMode: RenderMode.Client     // Client-side only
  }
];`,

    platformCheck: `// Checking platform in component
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // Browser-only code (localStorage, window, etc.)
    console.log('Running in browser');
  }
  
  if (isPlatformServer(this.platformId)) {
    // Server-only code
    console.log('Running on server');
  }
}`,

    httpTransfer: `// app.config.ts - Enable transfer state
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};`,
  };
}
