import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideNgxToast, withToastConfig } from 'ngx-toastf';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@auth/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideNgxToast(withToastConfig({ closeButton: true })),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
