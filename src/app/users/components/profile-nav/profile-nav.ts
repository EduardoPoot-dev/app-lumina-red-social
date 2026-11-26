import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PostsService } from '@posts/services/post-service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'user-nav',
  templateUrl: './profile-nav.html',
})
export class ProfileNav {
  private postService = inject(PostsService)
  userId = input.required<string>()
  postPath = input.required<string>()
  photosPath = input.required<string>()

  postCountResource = rxResource({
    params: () => ({userId: this.userId()}),
    stream: ({params}) => this.postService.countUserPosts(params.userId)
  })
}
