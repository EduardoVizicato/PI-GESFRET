import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.api}/api/user/`;

  constructor(private HttpClient: HttpClient,) {

  }
  getUsers(): Observable<user[]> {
    return this.HttpClient.get<user[]>(`${this.apiUrl}getAllActivedUsers`);
  }
  getAllUsers(): Observable<user[]> {
    return this.HttpClient.get<user[]>(`${this.apiUrl}getAllUsers`);
  }
  getDesactivedUsers(): Observable<user[]> {
    return this.HttpClient.get<user[]>(`${this.apiUrl}getAllDesactivedUsers`);
  }
  // ---------------------------------------------------------------------
  addUsers(user: user): Observable<user> {
    return this.HttpClient.post<user>(`${this.apiUrl}addUser`, user);
  }
  updateUsers(id: string, user: user): Observable<user> {
    return this.HttpClient.put<user>(`${this.apiUrl}updateUser?id=${id}`, user);
  }
  desactiveUsers(id: string): Observable<void> {
    return this.HttpClient.delete<void>(`${this.apiUrl}desactiveUser?id=${id}`);
  }

}
