import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly http: HttpClient) { }

  getComment(commentId: string): Observable<any> {
    return this.http.get(`${environment.domain}comment/${commentId}`);
  }
}
