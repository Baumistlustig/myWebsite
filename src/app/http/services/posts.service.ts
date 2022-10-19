import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private readonly http: HttpClient) {
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${environment.domain}post/`);
  }

  createPost(post: object) {
    return this.http.post(`${environment.domain}post/`, post);
  }

  getPostById(post_id: string): Observable<any> {
    return this.http.get(`${environment.domain}post/${post_id}`);
  }
}
