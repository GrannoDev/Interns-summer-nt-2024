import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
  untracked,
} from '@angular/core';
import { User } from '../../../shared/model/user.model';
import { SignalsService } from '../signals.service';

@Component({
  selector: 'app-detailed-user',
  standalone: true,
  imports: [JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (selectedUser(); as user) {
      <div>{{ user | json }}</div>
    }
  `,
})
export default class DetailedUserComponent {
  private readonly signalService = inject(SignalsService);
  protected userId = input.required({
    transform: (userId: string) => numberAttribute(userId),
  });
  protected selectedUser = signal<User | undefined>(undefined);
  initUser = effect(() => {
    const id = this.userId();
    if (id) {
      untracked(() => this.selectedUser.set(this.signalService.getUserById(id)));
    }
  });
}
