import { Component, computed, inject } from '@angular/core';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '@shared/components/paginatios-buttons/pagination-service';
import { FollowService } from '@users/services/follow-service';
import { map } from 'rxjs';
import { UserListGrid } from '@users/components/user-list-grid/user-list-grid';
import { UserService } from '@users/services/user-service';

@Component({
  selector: 'app-followings',
  imports: [UserListGrid],
  templateUrl: './followings.html',
})
export class Followings {
  private route = inject(ActivatedRoute)
  private followService = inject(FollowService)
  private userService = inject(UserService)
  private paginationService = inject(PaginationService)

  userId = toSignal(
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get!('id'))
    ),
    {
      initialValue: ''
    }
  )
  returnPath = computed(() => `/dashboard`)

  followingsResource = rxResource({
    params: () => ({
      userId: this.userId()!,
      page: this.paginationService.currentPage()
    }),
    stream : ({params}) => this.followService.getFollowings(params.userId, params.page )
  })

  followingCountResource = rxResource({
    params: () => ({
      userId: this.userId()!,
    }),
    stream: ({params}) => this.userService.getCountFollowing(params.userId)
  })
}
