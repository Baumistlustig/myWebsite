import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private readonly http: HttpClient) { }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.domain}file`);
  }

  uploadFile(formData: FormData): Observable<object> {
    return this.http.post(`${environment.domain}file`, formData);
  }

  deleteFile(id: string) {
    return this.http.delete(`${environment.domain}file/${id}`);
  }
}
