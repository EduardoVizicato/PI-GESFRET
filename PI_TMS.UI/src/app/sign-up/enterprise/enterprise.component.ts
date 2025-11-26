import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { enterprise } from './model/enterprise.model';
import { ThemeService } from '../../contrast/theme.service';
import { EnterpriseService } from './service/enterprise.service';
import { cnpjValidator } from '../../utils/cnpj.validator';

@Component({
  selector: 'app-enterprise',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, RouterModule],
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent {

  enterpriseForm: FormGroup;
  enterpriseId: enterprise | null = null;
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
        taxId: ['', [Validators.required, cnpjValidator]]
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
        this.enterpriseId = response; 
        console.log('Registered Enterprise ID:', this.enterpriseId);
        this.router.navigate(['/signUp-user'], { state: { enterpriseId: this.enterpriseId } });
      },
      error: (error) => {
        console.error('Error registering enterprise:', error);
      }
    });
  }


}
