import { Component, inject, input } from '@angular/core';
import { PostForm } from '../post-form/post-form';
import { PostsService } from '@posts/services/post-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgxToastService } from 'ngx-toastf';
import { Router } from '@angular/router';

@Component({
  selector: 'post-update-post-form',
  imports: [PostForm],
  templateUrl: './update-post-form.html',
})
export class UpdatePostForm {
  private router = inject(Router)
  private postService = inject(PostsService)
  private toastService = inject(NgxToastService)
  postId = input.required<string>()

  postResource = rxResource({
    params: () => ({id: this.postId()}),
    stream: ({params}) => this.postService.getPostById(params.id)
  })

  updatePost(formData: FormData) {
    this.postService.updatePost(this.postId(), formData).subscribe((success) => {
      if(success) {
        this.toastService.showToastSuccess("Cambios guardados correctamente")
        this.router.navigateByUrl('/dashboard')

      } else {
        this.toastService.showToastError("Hubo un error")
      }
    })
  }
}
