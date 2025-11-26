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

    console.log('Formulário válido, iniciando registro...', this.userForm.value);
    const userData: user = this.userForm.value;

    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso:', response);
        
        this.userService.authenticate(userData.email).subscribe({
          next: (authResponse) => {
            console.log('Email de autenticação enviado:', authResponse);
            
            this.router.navigate(['/verify'], { 
              state: { email: userData.email } 
            });
          },
          error: (authError) => {
            console.error('Erro ao enviar email de autenticação:', authError);
            alert('Usuário criado, mas houve um erro ao enviar o código de verificação.');
          }
        });
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao realizar o cadastro. Tente novamente.');
      }
    });
  }
}