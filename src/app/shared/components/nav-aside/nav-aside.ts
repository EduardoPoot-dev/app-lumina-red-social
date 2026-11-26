import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { LucideHouse, LucideBookmark, LucideUser, LucidePlus } from '@lucide/angular';
import { AuthService } from '@auth/services/auth-service';

@Component({
  imports: [RouterLink, RouterLinkActive, LucideHouse, LucideBookmark, LucideUser, LucidePlus],
  selector: 'shared-nav-aside',
  templateUrl: './nav-aside.html',
})
export class NavAside {
  private authService = inject(AuthService)

  userId = computed(() => this.authService.user() ? this.authService.user()?.id! : 'invalid-user-id')
}
