import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth-service';
import { UserMenuOptions } from '@users/components/user-menu-options/user-menu-options';
import { UserSearch } from '../user-search/user-search';

@Component({
  imports: [UserMenuOptions, RouterLink, UserSearch],
  selector: 'shared-top-bar',
  templateUrl: './top-bar.html',
})
export class TopBar {
  private authService = inject(AuthService)
  authenticated = computed(() => this.authService.authStatus() === 'authenticated')

  term = signal('')


}
