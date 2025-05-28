import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private loginService: LoginService) { }

  logOff(){
    localStorage.clear();
  }

  getLoginStatus(){
    !!localStorage.getItem('loginStatus');
  }

}
