import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Post, PostResponse, SavedPost, SavedPostResponse } from '@posts/interfaces';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl
@Service()
export class PostsService {
  private http = inject(HttpClient)

  postRefreshTrigger = signal(0)

  postRefresh() {
    this.postRefreshTrigger.update(prev => prev + 1)
  }

  createPost(formData: FormData) {
    const url = `${apiUrl}/posts`
    return this.http.post(url, formData)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  getPostById(postId: string) {
    const url = `${apiUrl}/posts/${postId}`
    return this.http.get<Post>(url)
  }

  updatePost(postId: string, formData: FormData) {
    const url = `${apiUrl}/posts/${postId}`
    return this.http.put(url, formData)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  countUserPosts(userId: string) {
    const url = `${apiUrl}/users/${userId}/posts/count`
    return this.http.get<number>(url)
  }

  getAllPost(page: number) {
    const take = 10;
    const url = `${apiUrl}/posts`
    return this.http.get<PostResponse>(url, {
      params: { take, page }
    })
  }



  getUserPosts(userId: string, page: number) {
    const pageSize = 10
    const url = `${apiUrl}/users/${userId}/posts`
    return this.http.get<PostResponse>(url, {
      params: {
        page: page,
        take: pageSize
      }
    })
  }

  deletePost(postId: string) {
    const url = `${apiUrl}/posts/${postId}`
    return this.http.delete(url).pipe(

    )
  }

  deletePostImage(postImageId: number) {
    const url = `${apiUrl}/post-images/${postImageId}`
    return this.http.delete(url).pipe(
      map(() => true)
    )
  }
}
