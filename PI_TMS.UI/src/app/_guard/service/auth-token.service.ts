import { Injectable } from '@angular/core';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  constructor(private tokenService: TokenService) { }  

  decodePayloadJWT(): any {
    const token = this.tokenService.getToken();
    if (!token) {
      return null;
    }
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Token inválido', e);
      return null;
    }
  }

  LogOff(): void {
    this.tokenService.removeToken();
    console.log('Usuário deslogado');
  }

  getUserId(): string | null {
    const payload = this.decodePayloadJWT();
    console.log('Payload:', payload);
    return payload?.nameid ?? null;
  }

}

// https://medium.com/xp-inc/angular-decode-payload-jwt-6d2618ec444d