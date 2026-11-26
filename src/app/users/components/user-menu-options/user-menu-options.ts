import { Component, computed, inject } from '@angular/core';
import { LucideLogOut } from '@lucide/angular';
import { AuthService } from '@auth/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ChangeProfilePhoto } from '../change-profile-photo/change-profile-photo';

const backendUrl = environment.backendUrl
@Component({
  imports: [LucideLogOut, ChangeProfilePhoto, RouterLink],
  selector: 'user-menu-options',
  templateUrl: './user-menu-options.html',
})
export class UserMenuOptions {
  private router = inject(Router)
  private authService = inject(AuthService)

  user = computed(() => this.authService.user())

  profilePhoto = computed(() => this.user()?.profilePhoto ? `${backendUrl}${this.user()?.profilePhoto?.imageUrl}` : './user.png')

  logOut() {
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }
}
