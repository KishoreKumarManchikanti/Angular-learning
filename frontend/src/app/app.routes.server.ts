import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender, // Static - built at compile time
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender, // Static - rarely changes
  },
  {
    path: 'ssr-basics',
    renderMode: RenderMode.Prerender, // Static educational content
  },
  {
    path: 'render-modes',
    renderMode: RenderMode.Prerender, // Static educational content
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Server, // Dynamic - rendered per request
  },
  {
    path: 'hydration-demo',
    renderMode: RenderMode.Server, // Dynamic - shows real-time hydration
  },
  {
    path: 'architecture',
    renderMode: RenderMode.Prerender, // Static educational content
  },
  {
    path: 'build-tools',
    renderMode: RenderMode.Prerender, // Static educational content
  },
  {
    path: 'infinite-scroll',
    renderMode: RenderMode.Client, // Client-only - uses browser APIs
  },
  {
    path: 'news-feed',
    renderMode: RenderMode.Client, // Client-only - uses browser APIs for infinite scroll
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // Default fallback
  },
];
