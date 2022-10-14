import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  // EditUser
  editUser(username: string, email: string, password: string): Observable<object> {
    return this.http.patch(`${environment.domain}user/edit`,
      { new_username: username, new_password: password });
  }

  // GetUser
  getUser(id: string | null): Observable<any> {
    return this.http.get(`${environment.domain}user/getuser/${id}`);
  }

  // DeleteUser
  deleteUser(): Observable<any> {
    return this.http.delete(`${environment.domain}user/`);
  }
}
