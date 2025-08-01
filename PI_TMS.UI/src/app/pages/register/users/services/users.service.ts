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
}
