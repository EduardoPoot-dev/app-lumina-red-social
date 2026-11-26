import { Routes } from '@angular/router';
import { NewPost } from './pages/new-post/new-post';
import { AppLayout } from '@shared/layouts/app-layout/app-layout';
import { authenticatedGuard } from '@auth/guards/authenticated-guard';
import { EditPost } from './pages/edit-post/edit-post';
import { Likes } from './pages/likes/likes';

const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        canMatch: [authenticatedGuard],
        path: 'new',
        component: NewPost
      },
      {
        canMatch: [],
        path: ':id/edit',
        component: EditPost
      },
      {
        path: ':id/likes',
        component: Likes
      }
    ]
  }
]

export default routes;
