import { Routes } from '@angular/router';
import { User } from './pages/user/user';
import { UserPhotos } from './pages/user-photos/user-photos';
import { UserLayout } from './layouts/user-layout/user-layout';
import { Followers } from './pages/followers/followers';
import { Followings } from './pages/followings/followings';

const routes: Routes = [
  {
    path: 'invalid-user-id',
    redirectTo: '/auth/login'
  },
  {
    path: ':id',
    component: UserLayout,
    children: [
      {
        path: '',
        component: User
      },
      {
        path: 'photos',
        component: UserPhotos
      },
      {
        path: 'followes',
        component: Followers
      },
      {
        path: 'followings',
        component: Followings
      },
    ]
  }

]

export default routes
