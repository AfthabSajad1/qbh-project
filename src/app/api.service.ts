import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsModel } from './table/table.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "https://qbh-project-be.onrender.com";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserDetailsModel[]> {
    return this.http.get<UserDetailsModel[]>(`${this.apiUrl}/users`);
  }

  getUSerById(id: string): Observable<UserDetailsModel> {
    return this.http.get<UserDetailsModel>(`${this.apiUrl}/users/${id}`)
  }

  postUser(data: any): Observable<UserDetailsModel> {
    return this.http.post<UserDetailsModel>(`${this.apiUrl}/users`, data);
  }

  editUser(id: string, data: any): Observable<UserDetailsModel[]> {
    return this.http.put<UserDetailsModel[]>(`${this.apiUrl}/users/${id}`, data);
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/users/${id}`);
  }

  generatePdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/users/generate-pdf`, {responseType: 'blob'});
  }
}
