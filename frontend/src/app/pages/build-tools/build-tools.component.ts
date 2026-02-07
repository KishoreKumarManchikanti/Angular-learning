import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BuildTool {
  name: string;
  logo: string;
  tagline: string;
  description: string;
  year: number;
  language: string;
  approach: string;
  pros: string[];
  cons: string[];
  usedBy: string[];
  configExample: string;
}

interface ComparisonMetric {
  metric: string;
  webpack: string;
  esbuild: string;
  vite: string;
  rollup: string;
}

@Component({
  selector: 'app-build-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './build-tools.component.html',
  styleUrl: './build-tools.component.scss',
})
export class BuildToolsComponent {
  currentAppBuilder = '@angular/build:application (esbuild-based)';

  readonly buildTools: BuildTool[] = [
    {
      name: 'Webpack',
      logo: '📦',
      tagline: 'The OG Module Bundler',
      description:
        'Webpack is a static module bundler that builds a dependency graph from entry points and combines modules into bundles. It dominated the JavaScript ecosystem from 2014-2022.',
      year: 2014,
      language: 'JavaScript',
      approach: 'Bundle everything - transforms, bundles, and optimizes all assets',
      pros: [
        'Extremely flexible and configurable',
        'Massive plugin ecosystem',
        'Handles all asset types (JS, CSS, images, fonts)',
        'Code splitting and lazy loading',
        'Hot Module Replacement (HMR)',
        'Tree shaking support',
      ],
      cons: [
        'Complex configuration',
        'Slower build times for large projects',
        'High memory usage',
        'Steep learning curve',
        'Configuration can become unwieldy',
      ],
      usedBy: ['Angular (pre-v17)', 'React (CRA)', 'Vue CLI', 'Next.js (partial)'],
      configExample: `// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\\.tsx?$/, use: 'ts-loader' },
      { test: /\\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};`,
    },
    {
      name: 'esbuild',
      logo: '⚡',
      tagline: 'Extremely Fast Bundler',
      description:
        'esbuild is a JavaScript bundler written in Go, making it 10-100x faster than JavaScript-based bundlers. It focuses on speed while providing essential bundling features.',
      year: 2020,
      language: 'Go',
      approach: 'Speed-first - parallelized parsing, printing, and source map generation',
      pros: [
        'Blazingly fast (10-100x faster than Webpack)',
        'Written in Go with parallel processing',
        'Simple API and configuration',
        'Built-in TypeScript and JSX support',
        'Tree shaking and minification',
        'Low memory footprint',
      ],
      cons: [
        'Limited plugin API compared to Webpack',
        'No HMR out of the box',
        'Fewer transformation options',
        'Less mature ecosystem',
        'Some edge cases not supported',
      ],
      usedBy: ['Angular 17+', 'Vite (for deps)', 'Snowpack', 'tsup'],
      configExample: `// esbuild.config.js
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  outfile: 'dist/bundle.js',
  format: 'esm',
});`,
    },
    {
      name: 'Vite',
      logo: '🔥',
      tagline: 'Next Generation Frontend Tooling',
      description:
        'Vite leverages native ES modules in the browser for instant dev server startup. It uses esbuild for dependency pre-bundling and Rollup for production builds.',
      year: 2020,
      language: 'JavaScript/TypeScript',
      approach: 'Native ESM dev server + Rollup production builds',
      pros: [
        'Instant dev server startup',
        'Lightning fast HMR',
        'Native ES modules in development',
        'Optimized production builds with Rollup',
        'Out-of-the-box TypeScript support',
        'Simple configuration',
        'Growing plugin ecosystem',
      ],
      cons: [
        'Dev/prod parity differences',
        'Requires modern browsers for development',
        'Rollup-based prod builds can be slower',
        'Plugin compatibility issues',
        'Less mature than Webpack',
      ],
      usedBy: ['Vue 3', 'Svelte', 'React (modern)', 'Nuxt 3', 'Astro'],
      configExample: `// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: { manualChunks: { vendor: ['react'] } },
    },
  },
  server: { port: 3000 },
});`,
    },
    {
      name: 'Rollup',
      logo: '🎯',
      tagline: 'ES Module Bundler',
      description:
        'Rollup is a module bundler optimized for ES modules. It produces smaller, more efficient bundles and is often used for library development.',
      year: 2015,
      language: 'JavaScript',
      approach: 'ES module-first bundling with excellent tree shaking',
      pros: [
        'Excellent tree shaking',
        'Smaller bundle sizes',
        'Clean ES module output',
        'Great for library development',
        'Simple plugin API',
        'Multiple output formats',
      ],
      cons: [
        'Slower than esbuild',
        'Limited code splitting',
        'Requires plugins for non-JS assets',
        'Less suitable for applications',
        'No built-in dev server',
      ],
      usedBy: ['Vite (production)', 'Svelte', 'React libraries', 'Vue libraries'],
      configExample: `// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
  ],
};`,
    },
  ];

  readonly comparisonMetrics: ComparisonMetric[] = [
    {
      metric: 'Build Speed',
      webpack: '🐢 Slow',
      esbuild: '🚀 Fastest',
      vite: '⚡ Fast (dev) / Medium (prod)',
      rollup: '🐇 Medium',
    },
    {
      metric: 'Dev Server',
      webpack: '✅ HMR',
      esbuild: '❌ None',
      vite: '✅ Native ESM + HMR',
      rollup: '❌ None',
    },
    {
      metric: 'Configuration',
      webpack: '😰 Complex',
      esbuild: '😊 Simple',
      vite: '😊 Simple',
      rollup: '🙂 Moderate',
    },
    {
      metric: 'Plugin Ecosystem',
      webpack: '🌟 Huge',
      esbuild: '⭐ Growing',
      vite: '🌟 Large',
      rollup: '⭐ Good',
    },
    {
      metric: 'Tree Shaking',
      webpack: '✅ Good',
      esbuild: '✅ Good',
      vite: '✅ Excellent',
      rollup: '✅ Best',
    },
    {
      metric: 'Bundle Size',
      webpack: '📦 Larger',
      esbuild: '📦 Medium',
      vite: '📦 Small',
      rollup: '📦 Smallest',
    },
    {
      metric: 'Memory Usage',
      webpack: '💾 High',
      esbuild: '💾 Low',
      vite: '💾 Medium',
      rollup: '💾 Medium',
    },
    {
      metric: 'Learning Curve',
      webpack: '📈 Steep',
      esbuild: '📉 Easy',
      vite: '📉 Easy',
      rollup: '📊 Moderate',
    },
  ];

  readonly angularBuildEvolution = [
    {
      version: 'Angular 2-16',
      builder: '@angular-devkit/build-angular:browser',
      bundler: 'Webpack',
      description:
        'Used Webpack as the default bundler with complex configuration managed by Angular CLI.',
    },
    {
      version: 'Angular 17',
      builder: '@angular-devkit/build-angular:application',
      bundler: 'esbuild + Vite',
      description:
        'Introduced esbuild for faster builds. Vite powers the dev server for instant HMR.',
    },
    {
      version: 'Angular 18+',
      builder: '@angular/build:application',
      bundler: 'esbuild',
      description:
        'New standalone @angular/build package. esbuild-based with optimized SSR support.',
    },
  ];

  readonly bundlingConcepts = [
    {
      concept: 'Module Bundling',
      description:
        'Combines multiple JavaScript modules into fewer files to reduce HTTP requests and optimize loading.',
      icon: '📦',
    },
    {
      concept: 'Tree Shaking',
      description:
        'Eliminates dead code by analyzing ES module import/export to remove unused exports from the final bundle.',
      icon: '🌳',
    },
    {
      concept: 'Code Splitting',
      description:
        'Breaks the bundle into smaller chunks loaded on demand, improving initial load time.',
      icon: '✂️',
    },
    {
      concept: 'Minification',
      description:
        'Removes whitespace, shortens variable names, and optimizes code to reduce file size.',
      icon: '🗜️',
    },
    {
      concept: 'Source Maps',
      description:
        'Maps bundled/minified code back to original source for debugging in browser DevTools.',
      icon: '🗺️',
    },
    {
      concept: 'Hot Module Replacement',
      description:
        'Updates modules in the browser without full page reload, preserving application state.',
      icon: '🔄',
    },
  ];

  activeTab: 'overview' | 'comparison' | 'angular' = 'overview';

  setActiveTab(tab: 'overview' | 'comparison' | 'angular'): void {
    this.activeTab = tab;
  }
}
