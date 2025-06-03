import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { sessionTest } from '../utils/sessionTest';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const protectedRoutes: string[] = ['dashboard', 'travels', 'register/trucks', 'register/loads', 'register/clients'];
  return protectedRoutes.includes(state.url) && !sessionTest ? router.navigate(['/login']) : false;
};
