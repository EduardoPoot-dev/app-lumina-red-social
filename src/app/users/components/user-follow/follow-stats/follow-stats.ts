import { Component, inject, input } from '@angular/core';
import { ItemStat } from '../item-stat/item-stat';
import { User } from '@auth/interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from '@users/services/user-service';

@Component({
  selector: 'user-follow-stats',
  imports: [ItemStat],
  templateUrl: './follow-stats.html',
})
export class FollowStats {
  private userService = inject(UserService)
  user = input.required<User>()

  followingResource = rxResource({
    stream: () => this.userService.getCountFollowing(this.user().id),
    defaultValue: 0
  })

  followerResource = rxResource({
    stream: () => this.userService.getCountFollower(this.user().id),
    defaultValue: 0
  })
}
