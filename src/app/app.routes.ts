import { Routes } from '@angular/router';

import { ROUTES } from './core/constants/routes';

export const routes: Routes = [
  {
    path: ROUTES.home,
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: ROUTES.uiKit,
    loadComponent: () => import('./features/ui-kit/ui-kit.component').then((m) => m.UiKitComponent),
  },
  {
    path: ROUTES.notFound,
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
