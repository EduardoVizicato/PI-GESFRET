import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthTokenService } from './service/auth-token.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authTokenService = inject(AuthTokenService);
  const router = inject(Router);
  // const tokenPayload = authTokenService.decodePayloadJWT();
  const allowedRoles = route.data['roles'] as Array<string>;
  const userRole = authTokenService.getRole();

  if (
    // tokenPayload.isActive == true &&
    !authTokenService.isTokenExpired() &&
    userRole !== null &&
    allowedRoles.includes(userRole)
  ) {
    return true;
  }
  console.warn('Acesso negado: Token inválido ou expirado');
  router.navigate(['/login']);
  return false;

};

