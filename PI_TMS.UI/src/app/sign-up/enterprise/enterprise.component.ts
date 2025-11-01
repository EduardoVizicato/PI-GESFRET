import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { enterprise } from './model/enterprise.model';
import { ThemeService } from '../../contrast/theme.service';
import { EnterpriseService } from './service/enterprise.service';

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
    private enterpriseService: EnterpriseService,
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
        taxId: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
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
    const enterpriseData: enterprise = this.enterpriseForm.value;
    this.enterpriseService.registerEnterprise(enterpriseData).subscribe({
      next: (response) => {
        console.log('Enterprise registered successfully:', response);
        this.router.navigate(['/signUp-user']);
      },
      error: (error) => {
        console.error('Error registering enterprise:', error);
      }
    });
  }


}
