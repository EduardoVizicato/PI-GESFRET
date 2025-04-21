// auth.service.ts
import { Injectable } from "@angular/core";

@Injectable({
   providedIn: "root",
})
export class AuthService {
   isAuthenticated = false; // You can set this based on your authentication logic

   constructor() {}

   // Example: Check if the user is authenticated
   checkAuthentication(): boolean {
      return this.isAuthenticated;
   }
}
