import { Component, inject } from '@angular/core';
import { LucideSquareBookmark } from '@lucide/angular';
import { PageHeading } from '../../../shared/components/page-heading/page-heading';
import { PostsService } from '@posts/services/post-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '@shared/components/paginatios-buttons/pagination-service';
import { PostsGrid } from '@posts/components/posts-grid/posts-grid';
import { SavedPostService } from '@posts/services/saved-post-service';

@Component({
  imports: [LucideSquareBookmark, PageHeading, PostsGrid],
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.html',
})
export class SavedPosts {
  private savedPostService = inject(SavedPostService)
  private paginationService = inject(PaginationService)

  savedPostsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      refresh: this.savedPostService.savedPostRefreshTrigger()
    }),
    stream: ({params}) => this.savedPostService.getSavedPosts(params.page)
  })
}
