import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { User } from '@auth/interfaces';
import { AuthService } from '@auth/services/auth-service';
import { PostResponse } from '@posts/interfaces';
import { ProfilePhoto } from '@users/interfaces';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl


@Service()
export class UserService {
  private authService = inject(AuthService)
  private http = inject(HttpClient)


  getUserById(userId: string) {
    const url = `${baseUrl}/users/${userId}`
    return this.http.get<User>(url)
  }

  getMyPosts(page: number) {
    const pageSize = 10
    const url = `${baseUrl}/posts/mine`
    return this.http.get<PostResponse>(url, {
      params: {
        page: page,
        take: pageSize
      }
    })
  }

  getCountFollowing(userId: string) {
    const url = `${baseUrl}/follows/users/${userId}/followings/count`
    return this.http.get<number>(url)
  }

  getCountFollower(userId: string) {
    const url = `${baseUrl}/follows/users/${userId}/followers/count`
    return this.http.get<number>(url)
  }

  getUserPosts(userId: string, page: number) {
    const pageSize = 10
    const url = `${baseUrl}/users/${userId}/posts`
    return this.http.get<PostResponse>(url, {
      params: {
        page: page,
        take: pageSize
      }
    })
  }

  search(userName: string) {
    const url = `${baseUrl}/users/search`
    return this.http.get<User[]>(url, {
      params: { userName }
    })
  }

  changeProfilePhoto(formData: FormData) {
    const url = `${baseUrl}/users/change-image-profile`
    return this.http.post<ProfilePhoto>(url, formData)
      .pipe(
        tap(() => this.authService.checkStatusResource.reload())
      )
  }


}
