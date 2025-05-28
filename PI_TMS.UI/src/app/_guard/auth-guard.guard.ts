// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
// import { AuthGuardService } from '../service/auth-guard.service';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuardGuard implements CanActivateFn{
//   constructor(private authguardService: AuthGuardService) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     // Check if the user is logged in
//     const isLoggedIn = this.authguardService.getLoginStatus();
//     if (!isLoggedIn) {
//       // If not logged in, redirect to the login page
//       console.log('User is not logged in, redirecting to login page');
//       window.location.href = '/login'; // Redirect to login page
//       return false; // Prevent access to the route
//     }
//     // If logged in, allow access to the route
//     console.log('User is logged in, allowing access to the route');

//   return true;
// }}


// // ng g guard 'name' 