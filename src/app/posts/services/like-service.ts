import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Like, Likes, UserHasLikedResponse } from '@posts/interfaces';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const urlBase = environment.apiUrl
@Service()
export class LikeService {
  private http = inject(HttpClient)

  userHasLiked(postId: string) {
    const url = `${urlBase}/posts/${postId}/liked`
    return this.http.get<UserHasLikedResponse>(url)
      .pipe(
        //tap((res) => console.log('userHasLiked response:', res)),
        map((response) => response.hasLiked),
        catchError(() => of(false))
      )
  }

  getPostLikesCount(postId: string) {
    const url = `${urlBase}/posts/${postId}/likes/count`
    return this.http.get<number>(url)
      .pipe(
       // tap((res) => console.log('count:', res)),
      )
  }

  likePost(postId: string) {
    const url = `${urlBase}/likes`
    return this.http.post<Like>(url, { postId })
  }

  deleteLikeByPostId(postId: string) {
    const url = `${urlBase}/posts/${postId}/like`
    return this.http.delete<boolean>(url)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  getLikesByPostId(postId: string, page: number) {
    const take = 10
    const url = `${urlBase}/posts/${postId}/likes`
    return this.http.get<Likes>(url, {
      params: {
        page, take
      }
    }).pipe(
      map((resp) => ({
        pageNumber: resp.pageNumber,
        pageSize: resp.pageSize,
        totalPages: resp.totalPages,
        items: resp.items.map(el => el.userId)
      }))
    )
  }


}
