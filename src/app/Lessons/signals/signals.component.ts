import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AddUserComponent } from './components/add-user.component';
import { UserTileComponent } from './components/user-tile.component';
import { SignalsService } from './signals.service';

@Component({
  selector: 'app-signals',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserTileComponent, AddUserComponent],
  template: `
    <div class="flex w-full flex-col items-center">
      <div class="flex items-center gap-2">
        <h1 class="text-lg font-medium text-primary">Signals Example</h1>
        @if (signalService.users().length > 0) {
          <app-add-user [largestId]="largestId()" (onCreateUser)="signalService.addUser($event)" />
        }
      </div>
      <div class="mt-2 grid w-full max-w-screen-xl grid-cols-[repeat(auto-fit,_minmax(360px,_1fr))] gap-4">
        @for (user of signalService.users(); track user.id) {
          <app-user-tile [user]="user" (onDelete)="signalService.deleteUser($event)" />
        } @empty {
          <button type="button" class="btn btn-ghost w-fit justify-self-center" (click)="signalService.loadUsers()">
            Load users
          </button>
        }
      </div>
    </div>
  `,
})
export class SignalsComponent {
  protected readonly signalService = inject(SignalsService);

  largestId = computed(() => Math.max(...this.signalService.users().map((user) => user.id)));

  test = signal<number[]>([1, 2, 3]);

  protected updateSignal = () => {
    this.test.update((nums) => [...nums, 10, 20, 30, 4, 5]);
  };

  athleteIds = computed(() => this.signalService.users().map((user) => user.id));
  testDoubled = computed(() => {
    console.log('hej');
    return this.test().map((v) => v * 10);
  });
}
