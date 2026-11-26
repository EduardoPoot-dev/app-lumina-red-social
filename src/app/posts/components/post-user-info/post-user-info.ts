import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { User } from '@auth/interfaces';
import { UserService } from '@users/services/user-service';
import { environment } from 'src/environments/environment';

const backendUrl = environment.backendUrl

@Component({
  imports: [RouterLink],
  selector: 'post-user-info',
  templateUrl: './post-user-info.html',
})
export class PostUserInfo {
  user = input.required<User>()

  profilePhoto = computed(() =>
    this.user().profilePhoto ?
    `${backendUrl}${this.user().profilePhoto?.imageUrl}` :
    './user.png'
  )

}
