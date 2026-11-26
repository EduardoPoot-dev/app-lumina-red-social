import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { LikeService } from '@posts/services/like-service';
import { PaginationService } from '@shared/components/paginatios-buttons/pagination-service';
import { map } from 'rxjs';
import { UserListGrid } from '@users/components/user-list-grid/user-list-grid';

@Component({
  selector: 'app-likes',
  imports: [UserListGrid],
  templateUrl: './likes.html',
})
export class Likes {
  private route = inject(ActivatedRoute)
  private likeService = inject(LikeService)
  private paginationService = inject(PaginationService)

  postId = toSignal(
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get!('id'))
    ),
    {
      initialValue: ''
    }
  )

  likesResource = rxResource({
    params: () => ({
      postId: this.postId()!,
      page: this.paginationService.currentPage()
    }),
    stream: ({params}) => this.likeService.getLikesByPostId(params.postId, params.page)
  })

  countLikesResource = rxResource({
    params: () => ({
      postId: this.postId()!,
      page: this.paginationService.currentPage()
    }),
    stream: ({params}) => this.likeService.getPostLikesCount(params.postId)
  })



}
