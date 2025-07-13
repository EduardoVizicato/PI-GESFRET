import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthTokenService } from './service/auth-token.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authTokenService = inject(AuthTokenService);
  const tokenPayload = authTokenService.decodePayloadJWT();

  if (tokenPayload && !authTokenService.isTokenExpired()) {
    return true;
  }
  console.warn('Acesso negado: Token inválido ou expirado');
  const router = inject(Router);
  router.navigate(['/login']);
  return false;

};

