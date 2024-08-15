import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  host: {
    class: 'bg-neutral-700 h-dvh w-vw',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid w-full grid-cols-1 gap-4 p-10">
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl text-primary" routerLink="/">Northtech Angular Basics</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
              <a routerLink="memory-leak" routerLinkActive="text-primary">Memory leak</a>
            </li>
            <li>
              <a routerLink="signals" routerLinkActive="text-primary">Signals</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="px-6">
        <router-outlet />
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'interns-summer-2024';
}
