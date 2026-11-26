import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'shared-page-heading',
  templateUrl: './page-heading.html',
})
export class PageHeading {
  title = input.required<string>()
  description = input.required<string>()



}
