import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/services/auth-service';
import { PostUserInfo } from '@posts/components/post-user-info/post-user-info';
import { UpdatePostForm } from '@posts/components/update-post-form/update-post-form';
import { PageHeading } from '@shared/components/page-heading/page-heading';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  imports: [UpdatePostForm, PageHeading, PostUserInfo],
  templateUrl: './edit-post.html',
})
export class EditPost {
  private authService = inject(AuthService)
  private route = inject(ActivatedRoute)
  user = computed(() => this.authService.user())

  postId = toSignal(this.route.paramMap.pipe(
    map(param => param.get('id')!)
  ), {
    initialValue: ''
  })

  
}
