import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../model/user.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.api}/api/user/addUser`;

  constructor(private HttpClients: HttpClient) { }

  registerUser(user: user): Observable<user[]> {
      return this.HttpClients.post<user[]>(`${this.apiUrl}`, user)
    }
}
