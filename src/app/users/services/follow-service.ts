import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AuthService } from '@auth/services/auth-service';
import { Follow, FollowResponse } from '@users/interfaces';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user-service';

interface UserHasFollowThisUser {
  followed: boolean,
  data: Follow | null
}

interface UserFollowResponse {

}

const apiUrl = environment.apiUrl
@Service()
export class FollowService {
  private http = inject(HttpClient)
  private authService = inject(AuthService)
  private userService = inject(UserService)

  userHasFollowThisUser(userId: string, followedUser: string): Observable<UserHasFollowThisUser> {
    const errorResp = of({followed: false, data: null})
    if(this.authService.authStatus() === "not-authenticated") {
      return errorResp
    }
    const url = `${apiUrl}/users/${userId}/following-user/${followedUser}`
    return this.http.get<Follow>(url)
      .pipe(
        map(resp => ({followed: true, data: resp})),
        catchError(() => errorResp)
      )
  }

  deleteFollow(followId: number) {
    const url = `${apiUrl}/follows/${followId}`
    return this.http.delete(url)
  }

  followUser(data: { followed: string }) {
    const url = `${apiUrl}/follows`
    return this.http.post(url, data)
  }

  getFollowers(userId: string, page: number) {
    const take = 10
    const url = `${apiUrl}/follows/users/${userId}/followers`
    return this.http.get<FollowResponse>(url, {
      params: { take, page }
    }).pipe(
      map((resp) => ({
        pageNumber: resp.pageNumber,
        pageSize: resp.pageSize,
        totalPages: resp.totalPages,
        items: resp.items.map(el => el.followById)
      }))
    )
  }

  getFollowings(userId: string, page: number) {
    const take = 10
    const url = `${apiUrl}/follows/users/${userId}/followings`
    return this.http.get<FollowResponse>(url, {
      params: { take, page }
    }).pipe(
      map((resp) => ({
        pageNumber: resp.pageNumber,
        pageSize: resp.pageSize,
        totalPages: resp.totalPages,
        items: resp.items.map(el => el.followedId)
      }))
    )
  }


}
