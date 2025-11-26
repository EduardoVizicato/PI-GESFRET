import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UserService } from './service/user.service';
import { Router, RouterModule } from '@angular/router';
import { user } from './model/user.model';
import { emailExistsValidator } from '../../utils/email-exists.validator';
import { cpfValidator } from '../../utils/cpf.validator';
import { UserVerifyService } from '../../utils/service/user-verify.service';
import { ThemeService } from '../../contrast/theme.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userForm: FormGroup;
  user: user[] = [];
  Id: string | undefined;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private userVerifyService: UserVerifyService,
    public themeService: ThemeService
  ) {
    this.Id = history.state.enterpriseId; 
    this.userForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      enterpriseId: this.Id,
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailExistsValidator(this.userVerifyService)],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)],
        updateOn: 'blur'
      }],
      taxId: this.fb.group({
        taxId: ['', [Validators.required, Validators.pattern(/^\d{11}$/), cpfValidator]]
      }),
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.log('Formulário inválido');
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true; 
    console.log('Iniciando processo de cadastro...');
    const userData: user = this.userForm.value;

    this.userService.registerUser(userData).subscribe({
      next: (registerResponse) => {
        console.log('Usuário registrado com sucesso:', registerResponse);
        
        console.log('Enviando código de verificação para:', userData.email);
        
        this.userService.authenticate(userData.email).subscribe({
          next: (authResponse) => {
            console.log('Código enviado com sucesso:', authResponse);
            this.isLoading = false;
            
          },
          error: (authError) => {
            this.isLoading = false;
            console.error('Erro ao enviar código:', authError);
            alert('Usuário criado, mas erro ao enviar código de verificação. Verifique o console.');
            // this.router.navigate(['/verify'], { state: { email: userData.email } });
          }
        });
        this.router.navigate(['/verify'], { 
              state: { email: userData.email } 
            });
      },
      error: (registerError) => {
        this.isLoading = false;
        console.error('Erro ao registrar usuário:', registerError);
        alert('Erro ao registrar usuário: ' + (registerError.error?.message || registerError.message || 'Erro desconhecido'));
      }
    });
  }
}