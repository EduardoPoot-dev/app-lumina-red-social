import { Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UserListGrid } from '@users/components/user-list-grid/user-list-grid';
import { FollowService } from '@users/services/follow-service';
import { PaginationService } from '@shared/components/paginatios-buttons/pagination-service';
import { UserService } from '@users/services/user-service';

@Component({
  selector: 'app-followers',
  imports: [UserListGrid],
  templateUrl: './followers.html',
})
export class Followers {
  private route = inject(ActivatedRoute)
  private followService = inject(FollowService)
  private paginationService = inject(PaginationService)
  private userService = inject(UserService)

  userId = toSignal(
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get!('id'))
    ),
    {
      initialValue: ''
    }
  )
  returnPath = computed(() => `/dashboard`)


  followersResource = rxResource({
    params: () => ({
      userId: this.userId()!,
      page: this.paginationService.currentPage()
    }),
    stream : ({params}) => this.followService.getFollowers(params.userId, params.page )
  })

  followingCountResource = rxResource({
    params: () => ({
      userId: this.userId()!,
    }),
    stream: ({params}) => this.userService.getCountFollower(params.userId)
  })

}
