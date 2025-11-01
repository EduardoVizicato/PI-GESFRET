import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnterpriseInfo, UserInfo } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = `${environment.api}/api/`;

  constructor(private HttpClient: HttpClient) {

  }

  getUserbyId(id: string): Observable<UserInfo> {
    return this.HttpClient.get<UserInfo>(`${this.apiUrl}user/getUserbyId?id=${id}`);
  }

  putUser(id: string, userInfo: UserInfo): Observable<UserInfo> {
    return this.HttpClient.put<UserInfo>(`${this.apiUrl}user/updateUser?id=${id}`, userInfo);
  }

  getEnterprisebyId(id: string): Observable<EnterpriseInfo> {
    return this.HttpClient.get<EnterpriseInfo>(`${this.apiUrl}enterprise/getEnterprisebyId?id=${id}`);
  }
  putEnterprise(id: string, enterpriseInfo: EnterpriseInfo): Observable<EnterpriseInfo> {
    return this.HttpClient.put<EnterpriseInfo>(`${this.apiUrl}enterprise/updateEnterprise?id=${id}`, enterpriseInfo);
  }

}
