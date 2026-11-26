import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Auth } from './layouts/auth/auth';

export const routes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {
        path: 'register',
        component: Register
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

export default routes;
