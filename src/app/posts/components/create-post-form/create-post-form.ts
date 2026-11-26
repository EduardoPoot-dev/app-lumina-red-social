import { Component, inject, input } from '@angular/core';
import { PostForm } from '../post-form/post-form';
import { NgxToastService } from 'ngx-toastf';
import { PostsService } from '@posts/services/post-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'create-post-form',
  imports: [PostForm],
  templateUrl: './create-post-form.html',
})
export class CreatePostForm {
  private router = inject(Router)
  private postService = inject(PostsService)
  private toastService = inject(NgxToastService)

  createPost(formData: FormData) {
    this.postService.createPost(formData).subscribe((success) => {
      if(success) {
        this.toastService.showToastSuccess("Post creado correctamente")
        this.router.navigateByUrl('/dashboard')
      } else {
        this.toastService.showToastError("Hubo un error")
      }
    })
  }
}
