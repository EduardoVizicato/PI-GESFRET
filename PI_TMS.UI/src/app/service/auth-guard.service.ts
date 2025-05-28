import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private loginService: LoginService) { }

  allowAccess(){
    (response) => {
      localStorage.setItem('isLoggedIn', 'true');
      console.log('Login successful');
    },
    (error) => {
      console.error('Login failed', error);
    }
  );
  }
  logOff(){
    localStorage.clear();
  }

  getLoginStatus(){

  }

}
