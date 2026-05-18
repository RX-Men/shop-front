import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ui-kit',
    loadComponent: () => import('./_demo/ui-kit.component').then((m) => m.UiKitComponent),
  },
];
