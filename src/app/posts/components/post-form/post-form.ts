import { Component, computed, inject, input, linkedSignal, output, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { LucidePaperclip, LucideSendHorizontal } from '@lucide/angular';
import { Post } from '@posts/interfaces';
import { PostsService } from '@posts/services/post-service';
import { ErrorMessages } from '@shared/components/error-messages/error-messages';
import { NgxToastService } from 'ngx-toastf';
import { environment } from 'src/environments/environment';

const MAX_FILES = 10;
const MAX_SIZE = 5 * 1024 * 1024;

@Component({
  imports: [LucidePaperclip, LucideSendHorizontal, RouterLink, FormField, ErrorMessages],
  selector: 'post-form',
  templateUrl: './post-form.html',
})
export class PostForm {
  private toastService = inject(NgxToastService)
  private postService = inject(PostsService)
  backendUrl = environment.backendUrl

  submitPost = output<FormData>()
  post = input<Post>()

  isEditMode = computed(() => !!this.post())

  existingImages = linkedSignal(() => this.post()?.images ?? [])
  removedIds = signal<number[]>([]);

  postModel = linkedSignal(() => ({
    content: this.post()?.content ?? '',
    files: [] as File[]
  }));

  postForm = form(this.postModel, (fielPath) => {
    required(fielPath.content, {message: "El contenido es obligatorio"})
  });

   private urlCache = new Map<File, string>();

  newPreviews = computed(() => {
    const images = this.postModel().files;
    const current = new Set(images);

    for (const [file, url] of this.urlCache) {
      if (!current.has(file)) {
        URL.revokeObjectURL(url);
        this.urlCache.delete(file);
      }
    }

    return images.map((file) => {
      let url = this.urlCache.get(file);
      if (!url) {
        url = URL.createObjectURL(file);
        this.urlCache.set(file, url);
      }
      return url;
    });
  });


  onFilesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []).filter(
      (f) => f.type.startsWith('image/') && f.size <= MAX_SIZE
    );

    this.postModel.update((m) => ({
      ...m,
      files: [...m.files, ...files],
    }));

    input.value = '';
  }

  removeNew(index: number) {
    this.postModel.update((m) => ({
      ...m,
      files: m.files.filter((_, i) => i !== index),
    }));
  }

  removeExisting(imageId: number) {
    if(window.confirm("¿Deseas eliminar esta imagen?")) {
      this.postService.deletePostImage(imageId).subscribe(() => {
        this.existingImages.update((list) => list!.filter((i) => i.id !== imageId));
        this.removedIds.update((ids) => [...ids, imageId]);
        this.toastService.showToastSuccess("Imagen eliminada correctamente")
      })
    }

  }

  submitForm(e: Event) {
    e.preventDefault()

    this.postForm().markAsTouched()

    submit(this.postForm, async () => {
      const formData = new FormData()

      formData.append('content', this.postModel().content)
      this.postModel().files.forEach(file => formData.append('files', file))

      this.submitPost.emit(formData)

      if(!this.isEditMode()) {
        this.postForm().reset()
      }

    })

  }
}
