import { Injectable } from '@angular/core';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  public getToken(): string | null {
    localStorage.setItem('token', environment.token);
    return localStorage.getItem('token');
  }

  public decodePayloadJWT(): any {
    try {
      const token = this.getToken();
      if (!token) {
        return null;
      }
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}

// https://medium.com/xp-inc/angular-decode-payload-jwt-6d2618ec444d