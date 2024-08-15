import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-super',
  standalone: true,
  imports: [],
  template: `
    <p>
      super works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuperComponent {

}
