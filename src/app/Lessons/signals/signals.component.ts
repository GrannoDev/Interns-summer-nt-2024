import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { SignalsService } from './signals.service'

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  providers: [SignalsService],
  template: `
    <div class="flex w-full flex-col items-center">
      <h1 class="text-lg font-medium text-primary">Signals Example</h1>
      <div
        class="mt-2 grid w-full max-w-screen-xl grid-cols-[repeat(auto-fit,_minmax(360px,_1fr))] gap-4"
      >
        @for (user of signalService.users(); track user.id) {
        } @empty {
          <button
            type="button"
            class="btn btn-ghost w-fit justify-self-center"
            (click)="signalService.loadUsers()"
          >
            Load users
          </button>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {
  protected readonly signalService = inject(SignalsService)
}
