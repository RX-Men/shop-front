import { Routes } from '@angular/router';
import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';

import { ROUTES } from './core/constants/routes';

export const routes: Routes = [
  {
    path: ROUTES.home,
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: ROUTES.catalog,
    loadComponent: () =>
      import('./features/catalog/catalog.component').then((m) => m.CatalogComponent),
  },
  {
    path: ROUTES.signUp,
    loadComponent: () =>
      import('./core/auth/sign-up/sign-up.component').then((m) => m.SignUpComponent),
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: ROUTES.signIn,
    loadComponent: () =>
      import('./core/auth/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: ROUTES.about,
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: ROUTES.uiKit,
    loadComponent: () => import('./features/ui-kit/ui-kit.component').then((m) => m.UiKitComponent),
  },
  {
    path: ROUTES.cart,
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: ROUTES.notFound,
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
