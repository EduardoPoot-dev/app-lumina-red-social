import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { UserService } from '@users/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'user-list-item',
  imports: [RouterLink],
  templateUrl: './user-list-item.html',
})
export class UserListItem {
  private userService = inject(UserService)

  backendUrl = environment.backendUrl
  userId = input.required<string>()

  userResource = rxResource({
    params: () => ({userId: this.userId()}),
    stream: ({params}) => this.userService.getUserById(params.userId)
  })

  profilePhoto = computed(() => this.userResource.value()?.profilePhoto ? `${this.backendUrl}${this.userResource.value()?.profilePhoto?.imageUrl}` : './user.png')

}
