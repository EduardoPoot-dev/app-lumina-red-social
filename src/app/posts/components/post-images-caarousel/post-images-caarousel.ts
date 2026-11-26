import { Component, input } from '@angular/core';
import { CarouselComponent } from 'ngx-carousel-ease';

@Component({
  selector: 'post-images-caarousel',
  imports: [CarouselComponent],
  templateUrl: './post-images-caarousel.html',
})
export class PostImagesCaarousel {
  imagePost = input<string[]>()
}
