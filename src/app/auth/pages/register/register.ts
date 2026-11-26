import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, pattern, required, submit, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { RegisterData } from '@auth/interfaces';
import { ErrorMessages } from '@shared/components/error-messages/error-messages';
import { AuthService } from '@auth/services/auth-service';
import { NgxToastService } from 'ngx-toastf';

@Component({
  imports: [RouterLink, FormField, ErrorMessages],
  selector: 'app-register',
  templateUrl: './register.html',
})
export class Register {
  private toastService = inject(NgxToastService);
  private authService = inject(AuthService);

  registerModel = signal<RegisterData>({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, (fieldPath) => {
    required(fieldPath.name, { message: 'El nombre es obligatorio' });
    required(fieldPath.userName, { message: 'El nombre de usuario es obligatorio' });

    required(fieldPath.email, { message: 'El correo es obligatorio' });
    email(fieldPath.email, { message: 'Email no válido' });

    required(fieldPath.password, { message: 'La contraseña es obligatorio' });
    minLength(fieldPath.password, 6, { message: 'La contraseña debe tener al mismo 6 caracteres' });
    pattern(fieldPath.password, /\d/, { message: 'La contraseña debe tener un número' });
    pattern(fieldPath.password, /[a-z]/, { message: 'La contraseña debe tene una minúscula' });
    pattern(fieldPath.password, /[A-Z]/, { message: 'La contraseña debe tener una mayúscula' });
    pattern(fieldPath.password, /[^A-Za-z0-9]/, {
      message: 'La contraseña debe tener un carácter especial',
    });

    required(fieldPath.confirmPassword, { message: 'Confirmar contraseña es obligatorio' });
    validate(fieldPath.confirmPassword, ({ value, valueOf }) => {
      if (value() !== valueOf(fieldPath.password)) {
        return {
          kind: 'PasswordMismatch',
          message: 'Las contraseñas no coinciden',
        };
      }
      return null;
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.registerForm().markAsTouched();

    submit(this.registerForm, async () => {
      const credentials = this.registerModel;
      this.authService.register(credentials()).subscribe((success) => {
        if (success) {
          this.toastService.showToastSuccess("Usuario creado correctamente")
        } else {
          this.toastService.showToastError('Nombre de usuario o email ya están en uso');
        }
      });
    })
  }
}
