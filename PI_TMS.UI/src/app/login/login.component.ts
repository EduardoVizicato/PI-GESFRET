import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './services/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../shared/service/event.service';
import { TokenService } from '../token/token.service';
import { AuthTokenService } from '../_guard/service/auth-token.service';

@Component({
  selector: 'app-login',
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authTokenService = inject(AuthTokenService);
  email = '';
  password = '';
  constructor(
    private eventService: EventService,
    private loginService: LoginService,
    private routerService: Router,
    private tokenService: TokenService 
  ) { 
    if (!this.authTokenService.isTokenExpired()) {
      this.routerService.navigate(['/dashboard']);
    }
  }

  SendLogin() {

    this.loginService.registerLogin(this.email, this.password).subscribe(
      (response: any) => {
        const token = response.token;

        if (token) {
          this.tokenService.setToken(token);
          console.log('Login successful');
          console.log(response);
          this.routerService.navigate(['/dashboard']);
        } else {
          console.error('Token failed.');
        }
      },
      (error) => {
        if (error.status === 401) {
          this.eventService.showError('Email ou senha inválidos!');
        } else {
          this.eventService.showError('Erro inesperado.');
        }
      }
    );

  }
}