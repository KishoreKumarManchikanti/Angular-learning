import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'ssr-basics',
    loadComponent: () =>
      import('./pages/ssr-basics/ssr-basics.component').then((m) => m.SsrBasicsComponent),
  },
  {
    path: 'render-modes',
    loadComponent: () =>
      import('./pages/render-modes/render-modes.component').then((m) => m.RenderModesComponent),
  },
  {
    path: 'hydration-demo',
    loadComponent: () =>
      import('./pages/hydration-demo/hydration-demo.component').then(
        (m) => m.HydrationDemoComponent,
      ),
  },
  {
    path: 'architecture',
    loadComponent: () =>
      import('./pages/architecture/architecture.component').then((m) => m.ArchitectureComponent),
  },
  {
    path: 'build-tools',
    loadComponent: () =>
      import('./pages/build-tools/build-tools.component').then((m) => m.BuildToolsComponent),
  },
  {
    path: 'infinite-scroll',
    loadComponent: () =>
      import('./pages/infinite-scroll/infinite-scroll.component').then(
        (m) => m.InfiniteScrollComponent,
      ),
  },
  {
    path: 'news-feed',
    loadComponent: () =>
      import('./pages/news-feed/news-feed.component').then((m) => m.NewsFeedComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
