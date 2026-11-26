import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'auth',
    loadChildren: () => import("../app/auth/auth.routes"),
  },
  {
    path: 'dashboard',
    loadChildren: () => import("../app/dashboard/dashboard.routes")
  },
  {
    path: 'posts',
    loadChildren: () => import("../app/posts/posts.routes")
  },
  {
    path: 'users',
    loadChildren: () => import("../app/users/users.routes")
  },
];
