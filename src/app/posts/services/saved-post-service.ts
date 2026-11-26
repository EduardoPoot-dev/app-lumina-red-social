import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth/services/auth-service';
import { PostResponse, SavedPostResponse, UserHasSavedResponse } from '@posts/interfaces';
import { map, catchError, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface SavedStatus {
  saved: boolean
}

const urlBase = environment.apiUrl
@Service()
export class SavedPostService {
  private authService = inject(AuthService)
  private http = inject(HttpClient)

  postsHasSavedStatus = signal(new Map<string, SavedStatus>())
  savePostsCount = signal(new Map<string, number>())
  savedPostRefreshTrigger = signal(0)

  toggleSaved(postId: string) {
    if (this.authService.authStatus() === 'not-authenticated') return

    const saved = this.postsHasSavedStatus().get(postId)?.saved ?? false
    if (saved) {
      this.deleteSavedPostByPostId(postId).subscribe()
    } else {
      this.savePost(postId).subscribe()
    }
  }

  savedPostRefresh() {
    this.savedPostRefreshTrigger.update(prev => prev + 1)
  }

  getSavedPosts(page: number): Observable<PostResponse> {
    const take = 10
    const url = `${urlBase}/saved-posts/mine`
    return this.http.get<SavedPostResponse>(url, {
      params: { take, page }
    })
      .pipe(
        map(resp => {
          return {
            totalPages: resp.totalPages,
            pageNumber: resp.pageNumber,
            pageSize: resp.pageSize,
            items: resp.items.map(savedPost => savedPost.post)
          }
        })
      )
  }

  deleteSavedPostByPostId(postId: string) {
    const url = `${urlBase}/posts/${postId}/saved`
    return this.http.delete<boolean>(url)
      .pipe(
        tap(() => {
          this.savedPostRefresh()
          this.postsHasSavedStatus.update(map => new Map(map).set(postId, {
            saved: false
          }))
          this.savePostsCount.update(map => new Map(map).set(postId, map.get(postId)! - 1))
        }),
        //   tap(() => {
        //     this.postsHasSavedStatus.update(map => new Map(map).set(postId, {
        //       saved: false
        //     }))
        //     this.savePostsCount.update(map => new Map(map).set(postId, savesCount - 1))
        //   }),
        map(() => true),
        catchError(() => of(false))
      )
  }



  savePost(postId: string) {
    const url = `${urlBase}/saved-posts`
    return this.http.post<SavedPostResponse>(url, { postId })
      .pipe(

          tap(() => {
            this.postsHasSavedStatus.update(map => new Map(map).set(postId, {
              saved: true
            }))
            this.savePostsCount.update(map => new Map(map).set(postId, map.get(postId)! + 1))
          })
      )
  }

  userHasSaved(postId: string) {
    const url = `${urlBase}/posts/${postId}/saved`
    return this.http.get<UserHasSavedResponse>(url)
      .pipe(
        tap((response) => {
          this.postsHasSavedStatus.update(map => new Map(map).set(postId, {
            saved: response.hasSaved
          }))
        }),
        map((response) => response.hasSaved)
      )
  }

  getPostSavesCount(postId: string) {
    const url = `${urlBase}/posts/${postId}/saved/count`
    return this.http.get<number>(url)
    .pipe(
      tap((count) => {
        this.savePostsCount.update((map) => new Map(map).set(postId, count))
      }),
      //   //tap((res) => console.log('userHasLiked response:', res)),
    )
  }
}
