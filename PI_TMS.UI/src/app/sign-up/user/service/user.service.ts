import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.api}/api/user`;
  private authUrl = `${environment.api}/api/auth`;

  constructor(private HttpClients: HttpClient) { }

  registerUser(user: user): Observable<user[]> {
    return this.HttpClients.post<user[]>(`${this.apiUrl}/addUser`, user)
  }

  checkEmail(email: string): Observable<{ exists: boolean }> {
    return this.HttpClients.get<{ exists: boolean }>(`${this.apiUrl}/getByEmail?email=${email}`)
  }

  authenticate(email: string): Observable<any> {
    return this.HttpClients.post(`${this.authUrl}/Authenticate`, { email });
  }
}