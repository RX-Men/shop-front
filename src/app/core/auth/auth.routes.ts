import { Route } from '@angular/router';
import { ROUTES } from '../constants/routes';

export const AUTH_ROUTES: Route[] = [
  {
    path: ROUTES.signUp,
    loadComponent: () => import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
];
