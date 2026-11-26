import { Component, computed, inject, input } from '@angular/core';
import { PostUserInfo } from '../post-user-info/post-user-info';
import { environment } from "../../../../environments/environment";
import { PostImagesCaarousel } from '../post-images-caarousel/post-images-caarousel';
import { PostButtonsContainer } from '../post-buttons/post-buttons-container/post-buttons-container';
import { PostMenuOption } from '../post-menu-option/post-menu-option';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from '@users/services/user-service';
import { Post } from '@posts/interfaces';
import { SavedPostService } from '@posts/services/saved-post-service';

const baseUrl = environment.backendUrl;
@Component({
  imports: [PostButtonsContainer, PostUserInfo, PostImagesCaarousel, PostMenuOption],
  selector: 'post-card',
  templateUrl: './post-card.html',
})
export class PostCard {
  private savedPostService = inject(SavedPostService)
  private userService = inject(UserService)
  post = input.required<Post>()
  imagePost = computed(() => this.post().images.map(img => baseUrl + img.imageUrl))

  userResource = rxResource({
    params: () => ({ userId: this.post().userId }),
    stream: ({ params }) => this.userService.getUserById(params.userId)
  })

  savedResource = rxResource({
    params: () => ({
      postId: this.post().id,
      refresh: this.savedPostService.savedPostRefreshTrigger()
    }),
    stream: ({params}) => this.savedPostService.userHasSaved(params.postId),
    defaultValue: false
  })

  savesCountResource = rxResource({
    params: () => ({
      postId: this.post().id,
      refresh: this.savedPostService.savedPostRefreshTrigger()
    }),
    stream: ({params}) => this.savedPostService.getPostSavesCount(params.postId),
    defaultValue: 0
  })
}
