import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';
import { map } from 'rxjs';

@Component({
  selector: 'user-list-heading',
  imports: [RouterLink, LucideArrowLeft],
  templateUrl: './user-list-heading.html',
})
export class UserListHeading {
  private route = inject(ActivatedRoute)

  title = input.required<string>()
  followCount = input.required<number>()

  returnPath = input.required<string>()
  //followCount = input.required<number>()


}
