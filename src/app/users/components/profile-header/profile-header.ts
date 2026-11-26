import { Component, computed, inject, input } from '@angular/core';
import { User } from '@auth/interfaces';
import { environment } from 'src/environments/environment';
import { FollowStats } from '../user-follow/follow-stats/follow-stats';
import { Router } from '@angular/router';
import { LucideUserRoundPlus } from '@lucide/angular';
import { AuthService } from '@auth/services/auth-service';
import { FollowService } from '@users/services/follow-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  imports: [FollowStats, LucideUserRoundPlus],
  selector: 'user-header',
  templateUrl: './profile-header.html',
})
export class ProfileHeader {
  baseUrl = environment.backendUrl
  private authService = inject(AuthService)
  private followService = inject(FollowService)
  user = input.required<User>()//followedUser

  isMyProfilePage = computed(() => this.user().id === this.authService.user()?.id)
  isAuthenticated = computed(() => this.authService.authStatus() === 'authenticated')

  userHasFollowToUserResource = rxResource({
    params: () => ({
      userId: this.authService.user()!.id,
      followdUser: this.user().id
    }),
    stream: ({params}) => this.followService.userHasFollowThisUser(params.userId, params.followdUser)
  })

  buttonText = computed(() => this.userHasFollowToUserResource.value()?.followed ? "Dejar de seguir" : "Seguir")

  toggleFollow() {
    const followData = this.userHasFollowToUserResource.value()
    if(followData && followData.followed) {
      this.followService.deleteFollow(+followData.data!.id).subscribe(() => {
        this.reloadResource()
      })
    } else {
      this.followService.followUser({followed: this.user().id}).subscribe(() => {
        this.reloadResource()
      })
    }
  }

  reloadResource() {
    this.userHasFollowToUserResource.reload()
  }
}
