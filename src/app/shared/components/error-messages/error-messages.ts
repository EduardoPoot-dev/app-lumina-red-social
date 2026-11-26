import { Component, input } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'shared-error-messages',
  templateUrl: './error-messages.html',
})
export class ErrorMessages {
  errors = input<ValidationError.WithFieldTree[]>([]);

}
