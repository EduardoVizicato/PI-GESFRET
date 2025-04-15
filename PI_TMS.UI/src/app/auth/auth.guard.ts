// auth.guard.ts
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
   providedIn: "root",
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // Check if the user is authenticated
      if (this.authService.checkAuthentication()) {
         return true; // User is authenticated, allow access
      } else {
         // User is not authenticated, redirect to the login page or another route
         this.router.navigate(["/login"]); // Adjust the route as needed
         return false;
      }
   }
}
