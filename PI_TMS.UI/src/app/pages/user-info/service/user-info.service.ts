import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/userInfo.model';
import { AuthTokenService } from '../../../_guard/service/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
   
  private apiUrl = `${environment.api}/api/user/`;

  constructor(private HttpClient: HttpClient, ) {
    
  }

  getUserbyId(id: string): Observable<UserInfo> {
    return this.HttpClient.get<UserInfo>(`${this.apiUrl}getUserbyId?id=${id}`);
  } 

}
