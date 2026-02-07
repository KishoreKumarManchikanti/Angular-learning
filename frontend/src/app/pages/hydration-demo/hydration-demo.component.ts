import { Component, OnInit, signal, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hydration-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hydration-demo.component.html',
  styleUrl: './hydration-demo.component.scss',
})
export class HydrationDemoComponent implements OnInit, AfterViewInit {
  serverTime = signal<string>('');
  clientTime = signal<string>('');
  isHydrated = signal<boolean>(false);
  clickCount = signal<number>(0);
  hydrationSteps = signal<{ step: string; completed: boolean }[]>([
    { step: 'Server renders HTML', completed: false },
    { step: 'HTML sent to browser', completed: false },
    { step: 'Browser displays content', completed: false },
    { step: 'JavaScript loads', completed: false },
    { step: 'Angular hydrates the app', completed: false },
    { step: 'App is interactive', completed: false },
  ]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.serverTime.set(new Date().toLocaleTimeString());

    // Simulate hydration steps on server
    if (!isPlatformBrowser(this.platformId)) {
      const steps = this.hydrationSteps();
      steps[0].completed = true;
      steps[1].completed = true;
      this.hydrationSteps.set([...steps]);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Simulate hydration process visualization
      this.clientTime.set(new Date().toLocaleTimeString());

      const steps = this.hydrationSteps();
      let delay = 0;

      steps.forEach((step, index) => {
        setTimeout(() => {
          const updatedSteps = this.hydrationSteps();
          updatedSteps[index].completed = true;
          this.hydrationSteps.set([...updatedSteps]);

          if (index === steps.length - 1) {
            this.isHydrated.set(true);
          }
        }, delay);
        delay += 300;
      });
    }
  }

  incrementCount() {
    this.clickCount.update((count) => count + 1);
  }

  resetDemo() {
    this.clickCount.set(0);
  }
}
