import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'demo/input',
    loadComponent: () => import('./_demo/input-demo.component').then((m) => m.InputDemoComponent),
  },
];
