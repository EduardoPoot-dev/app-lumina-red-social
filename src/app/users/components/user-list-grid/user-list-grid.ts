import { Component, input } from '@angular/core';
import { PaginatiosButtons } from '@shared/components/paginatios-buttons/paginatios-buttons';
import { UserListItem } from '../user-list-item/user-list-item';
import { UserListHeading } from '../user-list-heading/user-list-heading';

@Component({
  selector: 'user-list-grid',
  imports: [UserListItem, UserListHeading, PaginatiosButtons],
  templateUrl: './user-list-grid.html',
})
export class UserListGrid {
  title = input.required<string>()
  count = input.required<number>()
  returnPath = input.required<string>()


  users = input.required<{
      pageNumber: number;
      pageSize: number;
      totalPages: number;
      items: string[];
  }>()
}
