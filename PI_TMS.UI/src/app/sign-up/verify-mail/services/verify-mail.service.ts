import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyMailService {
  private apiUrl = `${environment.api}/api/auth`;

  constructor(private http: HttpClient) { }

  verify(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Verify`, { email, code }, { responseType: 'text' });
  }
}