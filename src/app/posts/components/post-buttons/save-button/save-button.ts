import { NgClass } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { AuthService } from '@auth/services/auth-service';
import { LucideBookmark } from '@lucide/angular';
import { SavedPostService } from '@posts/services/saved-post-service';
//import { useSavedPostStore } from '@posts/stores/use-saved-post-store';

@Component({
  selector: 'post-save-button',
  imports: [LucideBookmark, NgClass],
  templateUrl: './save-button.html',
})
export class SaveButton {
  private authService = inject(AuthService)
  private savedPostService = inject(SavedPostService)
  notAuthenticated = computed(() => this.authService.authStatus() === 'not-authenticated' )
  postId = input.required<string>()

  toggleSaved() {
    this.savedPostService.toggleSaved(this.postId())
  }


  // savedPostStore = useSavedPostStore(this.postId)

  savedPost = computed(() => this.savedPostService.postsHasSavedStatus().get(this.postId())?.saved ?? false)
  savesPostCount = computed(() => this.savedPostService.savePostsCount().get(this.postId()) ?? 0)
}
