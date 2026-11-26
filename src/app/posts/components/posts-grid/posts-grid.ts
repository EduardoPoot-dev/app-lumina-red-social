import { Component, input } from '@angular/core';
import { PostResponse } from '@posts/interfaces';
import { PaginatiosButtons } from '@shared/components/paginatios-buttons/paginatios-buttons';
import { PostCard } from 'src/app/posts/components/post-card/post-card';

@Component({
  imports: [PostCard, PaginatiosButtons],
  selector: 'posts-grid',
  templateUrl: './posts-grid.html',
})
export class PostsGrid {
  totalPages = input<number>(1)
  posts = input.required<PostResponse>()


}
