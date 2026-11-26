import { Routes } from '@angular/router';
import { AppLayout } from '../shared/layouts/app-layout/app-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Settings } from './pages/settings/settings';
import { SavedPosts } from './pages/saved-posts/saved-posts';
import { authenticatedGuard } from '@auth/guards/authenticated-guard';

const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        component: Dashboard
      },
      /*{
        path: 'settings',
        component: Settings
      },*/
      {
        canMatch: [authenticatedGuard],
        path: 'saved-posts',
        component: SavedPosts
      }
    ]
  }
];

export default routes;
