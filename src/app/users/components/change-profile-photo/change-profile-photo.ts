import { Component, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { LucideUserPen } from '@lucide/angular';
import { UserService } from '@users/services/user-service';
import { NgxToastService } from 'ngx-toastf';

@Component({
  selector: 'user-change-profile-photo',
  imports: [LucideUserPen],
  templateUrl: './change-profile-photo.html',
})
export class ChangeProfilePhoto {
  private toastService = inject(NgxToastService)
  private userService = inject(UserService)

  onFilesChange(event: Event) {
    const input = event.target as HTMLInputElement
    const image = input.files?.[0]

    if(!image) return
    if (!image.type.startsWith('image/') || image.size > 5 * 1024 * 1024) {
      input.value = '';
      return;
    }

    const formData = new FormData()
    formData.append('imageUrl', image)

    this.userService.changeProfilePhoto(formData).subscribe(() => {
      this.toastService.showToastSuccess("Imagen de perfil creado correctamente")
    })

  }
}
