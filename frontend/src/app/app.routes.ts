import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register.component').then((m) => m.RegisterComponent),
      },
    ],
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () => import('./products/products.component').then((m) => m.ProductsComponent),
  },
];
