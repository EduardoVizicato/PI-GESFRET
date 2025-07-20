import { Injectable } from '@angular/core';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { TokenService } from '../../token/token.service';

// https://blog.angular-university.io/angular-jwt-authentication/  study later

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
  isTokenExpired(): boolean {
    const payload = this.decodePayloadJWT();
    if (!payload || !payload.exp) return true;
    // console.log('Expiração do token:', payload.exp);
    const currentTime = Math.floor(Date.now() / 1000); // tempo atual em segundos
    // console.log('Tempo atual:', currentTime);
    console.log('Tempo de expiração do token:', payload.exp - currentTime);
    return payload.exp < currentTime;
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
  getUserName(): string | null {
    const payload = this.decodePayloadJWT();
    return payload?.given_name ?? null;
  }

}

// https://medium.com/xp-inc/angular-decode-payload-jwt-6d2618ec444d