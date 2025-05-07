import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

   
    private apiUrl = `${environment.api}/api/auth/login`;

  constructor(private HttpClients: HttpClient) {}

  registerLogin(email: string, password: string) {
        const body = { email, password };
        return this.HttpClients.post(this.apiUrl, body);
    }
}
