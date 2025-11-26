import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UserService } from './service/user.service';
import { Router, RouterModule } from '@angular/router';
import { user } from './model/user.model';
import { emailExistsValidator } from '../../utils/email-exists.validator';
import { cpfValidator } from '../../utils/cpf.validator';
import { UserVerifyService } from '../../utils/service/user-verify.service';
import { ThemeService } from '../../contrast/theme.service';
import { EnterpriseComponent } from '../enterprise/enterprise.component';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userForm: FormGroup;
  user: user[] = [];
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
  Id: string | undefined;

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
  // 

  onSubmit() {
    if (this.userForm.invalid) {
      console.log('Formulário inválido');
      this.userForm.markAllAsTouched(); // mostra erros
      return;
    }

    console.log('Formulário válido:', this.userForm.value);

    const userData: user = this.userForm.value;
    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

}
