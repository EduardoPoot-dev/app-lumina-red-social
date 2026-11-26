import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationService } from './pagination-service';

@Component({
  selector: 'shared-paginatios-buttons',
  imports: [RouterLink],
  templateUrl: './paginatios-buttons.html',
})
export class PaginatiosButtons {
  private paginationService = inject(PaginationService)
  page = computed(() => this.paginationService.currentPage())
  totalPages = input.required<number>()

  prevPage = computed(() => {
    const updatedPage = this.page() - 1;
    if(updatedPage <= 1) {
      return 1
    }
    return updatedPage
  })

  nextPage = computed(() => {
    const updatedPage = this.page() + 1;
    if(updatedPage >= this.totalPages()) {
      return this.totalPages()
    }
    return updatedPage
  })


}
