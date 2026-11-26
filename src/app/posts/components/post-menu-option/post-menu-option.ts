import { NgClass } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth-service';
import { LucideBookmark, LucideEllipsis, LucidePencil, LucideTrash } from '@lucide/angular';
import { Post } from '@posts/interfaces';
import { PostsService } from '@posts/services/post-service';
import { SavedPostService } from '@posts/services/saved-post-service';
//import { useSavedPostStore } from '@posts/stores/use-saved-post-store';

@Component({
  selector: 'post-menu-option',
  imports: [RouterLink, LucideBookmark, LucidePencil, LucideTrash, LucideEllipsis, NgClass],
  templateUrl: './post-menu-option.html',
})
export class PostMenuOption {
  private router = inject(Router)
  private postService = inject(PostsService)
  private savedPostService = inject(SavedPostService)
  private authService = inject(AuthService)

  authenticated = computed(() => this.authService.authStatus() === 'authenticated')

  post = input.required<Post>()
  postId = computed(() => this.post().id)


  postBelongsToUser = computed(() => this.post().userId === this.authService.user()?.id)

  // savedPostStore = useSavedPostStore(this.postId)
  savedPost = computed(() => this.savedPostService.postsHasSavedStatus().get(this.postId())?.saved ?? false)
  savePostButtonText = computed(() => this.savedPost() ? 'Eliminar post de guardados' : 'Guardar post')

  deletePost() {
    if(window.confirm("Deseas eliminar el post")) {
      this.postService.deletePost(this.postId()).subscribe(() => {
        this.postService.postRefresh()
        this.savedPostService.savedPostRefresh()
      })
    }
  }

  toggleSaved() {
    this.savedPostService.toggleSaved(this.postId())
  }
}
