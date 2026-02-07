import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent {
  readonly angularVersion = '21.1.0';
  readonly ssrPackageVersion = '21.1.2';
  readonly nestVersion = '11.0.1';

  readonly frontendStack = [
    {
      name: 'Angular',
      version: '21.1.0',
      description: 'Frontend framework with standalone components',
    },
    {
      name: '@angular/ssr',
      version: '21.1.2',
      description: 'Modern SSR package (replaced Angular Universal)',
    },
    { name: 'Express', version: '5.1.0', description: 'Node.js server for SSR' },
    { name: 'RxJS', version: '7.8.0', description: 'Reactive programming library' },
  ];

  readonly backendStack = [
    { name: 'NestJS', version: '11.0.1', description: 'Progressive Node.js framework' },
    { name: 'Express', version: '5.0.0', description: 'HTTP server platform' },
  ];

  readonly renderModes = [
    {
      mode: 'Prerender (SSG)',
      description: 'Static generation at build time',
      useCases: 'Home, About, Documentation pages',
    },
    {
      mode: 'Server (SSR)',
      description: 'Dynamic rendering per request',
      useCases: 'Dashboard, Real-time data pages',
    },
    {
      mode: 'Client (CSR)',
      description: 'Client-side only rendering',
      useCases: 'Auth-protected, highly interactive pages',
    },
  ];

  readonly keyFeatures = [
    {
      title: 'No Angular Universal',
      icon: '🚫',
      description:
        'This app uses @angular/ssr, not Angular Universal. Angular Universal was deprecated in Angular 17 and its functionality was merged into the new @angular/ssr package.',
    },
    {
      title: 'Modern SSR with @angular/ssr',
      icon: '⚡',
      description:
        'Uses AngularNodeAppEngine from @angular/ssr/node for server-side rendering with Express integration.',
    },
    {
      title: 'Hybrid Rendering',
      icon: '🔄',
      description:
        'Supports multiple render modes per route: Prerender (SSG), Server (SSR), and Client (CSR).',
    },
    {
      title: 'Client Hydration',
      icon: '💧',
      description:
        'Enables provideClientHydration() with withEventReplay() for seamless server-to-client transition.',
    },
    {
      title: 'Standalone Components',
      icon: '📦',
      description:
        "All components are standalone - no NgModules required. Uses Angular 21's modern architecture.",
    },
    {
      title: 'Lazy Loading',
      icon: '🚀',
      description: 'Routes use loadComponent() for code splitting and optimal bundle sizes.',
    },
  ];

  readonly fileStructure = [
    { file: 'server.ts', description: 'Express server with AngularNodeAppEngine for SSR' },
    { file: 'main.server.ts', description: 'Server bootstrap using bootstrapApplication()' },
    { file: 'main.ts', description: 'Client browser bootstrap' },
    { file: 'app.config.ts', description: 'Client app config with hydration providers' },
    { file: 'app.config.server.ts', description: 'Server config merged with client config' },
    { file: 'app.routes.server.ts', description: 'Server routes with render mode definitions' },
  ];
}
