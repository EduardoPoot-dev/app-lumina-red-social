import { NgClass } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth-service';
import { LucideHeart } from '@lucide/angular';
import { LikeService } from '@posts/services/like-service';

@Component({
  selector: 'post-like-button',
  imports: [LucideHeart, NgClass, RouterLink],
  templateUrl: './like-button.html',
})
export class LikeButton {
  private authService = inject(AuthService)
  private likeService = inject(LikeService)
  postId = input.required<string>()
  notAuthenticated = computed(() => this.authService.authStatus() === 'not-authenticated' )

  likesCountResource = rxResource({
    params: () => ({postId: this.postId()}),
    stream: ({params}) => this.likeService.getPostLikesCount(params.postId),
    defaultValue: 0
  })

  likeResource = rxResource({
    params: () => ({postId: this.postId()}),
    stream: ({params}) => this.likeService.userHasLiked(params.postId),
    defaultValue: false
  })

  toggleLike() {
    if(this.notAuthenticated()) return

    if(this.likeResource.value()) {
      this.likeService.deleteLikeByPostId(this.postId())
        .subscribe(() => {
          this.reloadResources()
        })
    } else {
      this.likeService.likePost(this.postId())
        .subscribe(() => {
          this.reloadResources()
        })
    }
  }

  private reloadResources() {
    this.likeResource.reload()
    this.likesCountResource.reload()
  }


}
