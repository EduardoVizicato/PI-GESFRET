import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './services/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../shared/service/event.service';
import { TokenService } from '../token/token.service';
import { AuthTokenService } from '../_guard/service/auth-token.service';

@Component({
  selector: 'app-login',
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authTokenService = inject(AuthTokenService);
  email = '';
  password = '';
  LoginForm: FormGroup;
  constructor(
    private eventService: EventService,
    private loginService: LoginService,
    private routerService: Router,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) {
    if (!this.authTokenService.isTokenExpired()) {
      this.routerService.navigate(['/dashboard']);
    }
    this.LoginForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)]], // Senha deve ter pelo menos 6 caracteres, uma letra maiúscula e um número]],
    });
  }
  SendLogin() {
    if (this.LoginForm.invalid) {
      // console.log('Formulário inválido');
      this.LoginForm.markAllAsTouched();
      return;
    }
    this.loginService.registerLogin(this.LoginForm.value.email, this.LoginForm.value.password).subscribe(
      (response: any) => {
        const token = response.token;

        if (token) {
          this.tokenService.setToken(token);
          // console.log('Login successful');
          // console.log(response);
          this.routerService.navigate(['/dashboard']);
        } else {
          this.eventService.showError('Erro inesperado.');
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