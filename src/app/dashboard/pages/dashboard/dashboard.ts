import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PostCard } from '@posts/components/post-card/post-card';
import { PostsGrid } from '@posts/components/posts-grid/posts-grid';
import { PostsService } from '@posts/services/post-service';
import { PaginationService } from '@shared/components/paginatios-buttons/pagination-service';

@Component({
  imports: [PostsGrid],
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private postService = inject(PostsService)
  private paginationService = inject(PaginationService)

  postResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      refresh: this.postService.postRefreshTrigger()
    }),
    stream: ({params}) => this.postService.getAllPost(params.page)
  })
}
