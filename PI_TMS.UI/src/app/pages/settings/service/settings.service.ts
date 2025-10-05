import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = `${environment.api}/api/user/`;

  constructor(private HttpClient: HttpClient) {

  }

  getUserbyId(id: string): Observable<UserInfo> {
    return this.HttpClient.get<UserInfo>(`${this.apiUrl}getUserbyId?id=${id}`);
  }

  putUser(id: string, userInfo: UserInfo): Observable<UserInfo> {
    return this.HttpClient.put<UserInfo>(`${this.apiUrl}updateUser?id=${id}`, userInfo);
  }
}
