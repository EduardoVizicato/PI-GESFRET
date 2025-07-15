import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { enterprise } from './model/enterprise.model';

@Component({
  selector: 'app-enterprise',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './enterprise.component.html',
  styleUrl: './enterprise.component.css'
})
export class EnterpriseComponent {

  enterpriseForm: FormGroup;
  enterprises: enterprise[] = [];
  constructor(private router: Router, private fb: FormBuilder) {
    this.enterpriseForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      taxId: this.fb.group({
        taxId: ['', Validators.required, Validators.pattern(/^\d{11}$/)] 
      }),
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(mainContainer: HTMLElement): void {
    if (this.enterpriseForm.invalid) {
      console.log('Formulário inválido');
      this.enterpriseForm.markAllAsTouched(); // mostra erros
      return;
    }
    mainContainer.classList.add('active');
    setTimeout(() => {
      this.router.navigate(['/signUp-user']);
    }, 1500);
  }


}
