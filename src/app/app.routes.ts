import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'core'
  },
  {
    path: 'core',
    loadComponent: () => import('./core-root/core-root').then(m => m.CoreRoot),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home').then(m => m.Home),
      },
      {
        path: 'board',
        loadComponent: () => import('./board/board').then(m => m.Board),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings').then(m => m.Settings),
      }
    ]
  }
];
