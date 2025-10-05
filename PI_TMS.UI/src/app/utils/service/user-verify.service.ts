import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserVerifyService {

  private apiUrl = `${environment.api}/api/user`;

  constructor(private HttpClients: HttpClient) { }

  // Change the break point for checkEmail - need return true or false
  checkEmail(email: string): Observable<{ exists: boolean }> {
    return this.HttpClients.get<{ exists: boolean }>(`${this.apiUrl}/getByEmail?email=${email}`)
  }
}
