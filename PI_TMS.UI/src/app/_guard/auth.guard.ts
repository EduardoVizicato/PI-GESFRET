import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { sessionTest } from '../utils/sessionTest';
import { AuthTokenService } from './service/auth-token.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tokenService = inject(AuthTokenService);
  const JsonToken = (tokenService.decodePayloadJWT());
  console.log(JsonToken);
  if (JsonToken) {
    return true;
  }
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};

