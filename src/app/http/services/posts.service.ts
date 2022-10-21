import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts.models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private readonly http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(`${environment.domain}post/`);
  }

  createPost(post: object) {
    return this.http.post(`${environment.domain}post/`, post);
  }

  editPost(post: Post): Observable<any> {
    return this.http.patch(`${environment.domain}post/`, {
      title: post.title,
      content: post.content,
      postId: post._id,
    });
  }

  deletePost(post_id: string): Observable<any> {
    return this.http.delete(`${environment.domain}post/${post_id}`);
  }

  getPostById(post_id: string): Observable<any> {
    return this.http.get(`${environment.domain}post/${post_id}`);
  }

  upvote(post_id: string) {
    const payload: object = { type: true, post_id: post_id };
    return this.http.patch(`${environment.domain}post/vote`, payload);
  }

  downvote(post_id: string) {
    const payload: object = { type: false, post_id: post_id };
    return this.http.patch(`${environment.domain}post/vote`, payload);
  }
}
