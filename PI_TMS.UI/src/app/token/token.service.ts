import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'accessToken';
  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public getDecodedToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
      } catch (e) {
        console.error('Erro ao decodificar o token:', e);
        return null;
      }
    }
    return null;
  }

  public getEnterpriseId(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.Enterprise : null;
  }
}