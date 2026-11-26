import { Component, input } from '@angular/core';
import { LikeButton } from '../like-button/like-button';
import { SaveButton } from '../save-button/save-button';

@Component({
  selector: 'post-buttons-container',
  imports: [LikeButton, SaveButton],
  templateUrl: './post-buttons-container.html',
})
export class PostButtonsContainer {
  postId = input.required<string>()


}
