import { Routes } from '@angular/router';

import { ROUTES } from './core/constants/routes';

export const routes: Routes = [
  {
    path: ROUTES.home,
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
];
