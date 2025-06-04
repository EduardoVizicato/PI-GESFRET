import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { sessionTest } from '../utils/sessionTest';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(localStorage.getItem('authStatus') == 'true'){
    return true ;
  }
  const router = inject(Router);
  router.navigate(['/login']);
  return false ;
};

