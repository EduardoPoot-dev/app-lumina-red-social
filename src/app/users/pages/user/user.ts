import { Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PostsGrid } from '@posts/components/posts-grid/posts-grid';
import { PostsService } from '@posts/services/post-service';
import { PaginationService } from '@shared/components/paginatios-buttons/pagination-service';
import { UserService } from '@users/services/user-service';
import { map } from 'rxjs';
import { ProfileHeader } from '@users/components/profile-header/profile-header';
import { ProfileNav } from '@users/components/profile-nav/profile-nav';

@Component({
  imports: [PostsGrid, ProfileHeader, ProfileNav],
  providers: [],
  selector: 'app-user',
  templateUrl: './user.html',
})
export class User {
  private userService = inject(UserService)
  private postService = inject(PostsService)
  private route = inject(ActivatedRoute)
  private paginationService = inject(PaginationService);

  //userId = this.route.snapshot.paramMap.get('id')
  userId = toSignal(
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get!('id'))
    ),
    {
      initialValue: ''
    }
  )

  myPostPath = computed(() => `/users/${this.userId()}`)
  myPhotosPath = computed(() => `/users/${this.userId()}/photos`)

  userResource = rxResource({
    params: () => ({userId: this.userId() ?? ''}),
    stream: ({params}) => this.userService.getUserById(params.userId)
  })


  postResource = rxResource({
    params: () => ({
      userId: this.userId() ?? '',
      page: this.paginationService.currentPage(),
      refresh: this.postService.postRefreshTrigger()
    }),
    stream: ({ params }) => this.postService.getUserPosts(params.userId, params.page),
  })


}
