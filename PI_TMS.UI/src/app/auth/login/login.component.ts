import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './services/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { AuthGuardService } from '../../service/auth-guard.service';

@Component({
  selector: 'app-login',
  imports: [HttpClientModule,FormsModule, CommonModule,],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private loginService: LoginService, private authguardService : AuthGuardService) {}
 SendLogin() {
  this.loginService.registerLogin(this.email, this.password).subscribe({
    next: (response) => {
      this.authguardService.allowAccess();
      console.log('Login successful');
    }
  });
  }
}
