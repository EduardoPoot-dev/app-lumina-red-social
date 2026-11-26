import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'item-stat',
  imports: [RouterLink],
  templateUrl: './item-stat.html',
})
export class ItemStat {
  userId = input('')
  itemText = input('')
  itemLabel = input('')
  itemValue = input(0)
}
