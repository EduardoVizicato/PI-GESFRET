import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { enterprise } from './model/enterprise.model';
import { ThemeService } from '../../contrast/theme.service';

@Component({
  selector: 'app-enterprise',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, RouterModule],
  templateUrl: './enterprise.component.html',
  styleUrl: './enterprise.component.css'
})
export class EnterpriseComponent {

  enterpriseForm: FormGroup;
  enterprises: enterprise[] = [];
  constructor(
    private router: Router, 
    private fb: FormBuilder,
    public themeService: ThemeService
  ) {
    this.enterpriseForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      taxId: this.fb.group({
        taxId: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]]
      }),
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.enterpriseForm.invalid) {
      console.log('Formulário inválido');
      this.enterpriseForm.markAllAsTouched();
      return;
    }
    // mainContainer.classList.add('active');
    // setTimeout(() => {
    this.router.navigate(['/signUp-user']);
    console.log('router funcionando');
    // }, 1500);
  }


}
