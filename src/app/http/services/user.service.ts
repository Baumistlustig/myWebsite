import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUserById(userId: string): Observable<object> {
    return this.http.get(`${environment.domain}user/getuser/${userId}`);
  }

  editUser(
    username: string,
    email: string,
    password: string,
  ): Observable<object> {
    return this.http.post(`${environment.domain}user/edit`, {
      username,
      email,
      password,
    });
  }

  getUserByName(username: string | null): Observable<object> {
    return this.http.get(`${environment.domain}user/name/${username}`);
  }

  deleteUser(userId: string | null): Observable<object> {
    return this.http.delete(`${environment.domain}user/${userId}`);
  }

  // Edit user profile
  editProfile(bio: string, status: string): Observable<object> {
    return this.http.patch(`${environment.domain}profile/edit`, {
      bio,
      status,
    });
  }

  uploadProfileImage(formData: FormData): Observable<object> {
    return this.http.post(`${environment.domain}profile/picture`, formData);
  }

  getProfile(userId: string): Observable<object> {
    return this.http.get(`${environment.domain}profile/${userId}`);
  }

  toggleFollow(targetId: string): Observable<object> {
    return this.http.post(`${environment.domain}profile/follow/${targetId}`, {});
  }
}
