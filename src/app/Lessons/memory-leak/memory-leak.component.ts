import { Component, signal } from '@angular/core';
import { ExpandAnimation } from '../../shared/animations';
import { PollerComponent } from './poller.component';

@Component({
  selector: 'app-memory-leak',
  standalone: true,
  imports: [PollerComponent],
  animations: [ExpandAnimation],
  template: `
    <div class="flex flex-col items-center gap-4 overflow-hidden rounded-lg p-4">
      <h1 class="text-lg font-medium text-primary">Memory Leak Example</h1>
      <button type="button" class="btn btn-ghost" (click)="showPoller.set(!showPoller())">
        {{ showPoller() ? 'Destroy Poller' : 'Show Poller' }}
      </button>

      @if (showPoller()) {
        <app-poller [@expand]="showPoller()" />
      }
    </div>
  `,
})
export class MemoryLeakComponent {
  protected showPoller = signal(false);
}
