import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginData } from '@auth/interfaces';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { ErrorMessages } from '@shared/components/error-messages/error-messages';
import { NgxToastService } from 'ngx-toastf';
import { AuthService } from '@auth/services/auth-service';

@Component({
  imports: [RouterLink, FormField, ErrorMessages],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  private toastService = inject(NgxToastService);
  private authService = inject(AuthService);
  private router = inject(Router)

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fielPath) => {
    email(fielPath.email, { message: 'Email no válido' });
    required(fielPath.email, { message: 'El email es obligatorio' });

    required(fielPath.password, { message: 'La contraseña es obligatoria' });
  });

  onSubmit(e: Event) {
    e.preventDefault();
    this.loginForm().markAsTouched();

    submit(this.loginForm, async () => {
      const credentials = this.loginModel;

      this.authService.login(credentials().email, credentials().password)
        .subscribe((isAuthenticated) => {
          if(isAuthenticated) {
            this.router.navigateByUrl('/dashboard')
          } else {
            this.toastService.showToastError('Credenciales incorrectas');
          }
        })
    });
  }
}
