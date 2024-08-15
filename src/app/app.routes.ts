import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'memory-leak',
    loadComponent: () => import('./Lessons/memory-leak/memory-leak.component').then((c) => c.MemoryLeakComponent),
  },
  {
    path: 'signals',
    loadComponent: () => import('./Lessons/signals/signals.component').then((c) => c.SignalsComponent),
  },
  {
    path: 'signals/:userId',
    loadComponent: () => import('./Lessons/signals/components/detailed-user.component'),
  },
];
