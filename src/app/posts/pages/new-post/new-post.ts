import { Component, computed, inject } from '@angular/core';
import { PostUserInfo } from '@posts/components/post-user-info/post-user-info';
import { PageHeading } from '@shared/components/page-heading/page-heading';
import { PostForm } from '@posts/components/post-form/post-form';
import { AuthService } from '@auth/services/auth-service';
import { CreatePostForm } from '@posts/components/create-post-form/create-post-form';

@Component({
  imports: [PageHeading, PostUserInfo, CreatePostForm],
  selector: 'app-new-post',
  templateUrl: './new-post.html',
})
export class NewPost {
  private authService = inject(AuthService)
  user = computed(() => this.authService.user())
}
