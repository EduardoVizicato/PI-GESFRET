import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { user } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() userData?: user;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';
  @Output() onSubmit = new EventEmitter<user>();
  usersForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.usersForm = this.createForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && this.userData) {
      this.usersForm = this.createFormWithUser(this.userData);
    } else if (this.mode === 'add') {
      this.usersForm = this.createForm();
    }
  }
  createFormWithUser(user: user): FormGroup {
    return this.fb.group({
      id: [user.id],
      firstName: [user.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [user.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [user.email, [Validators.required, Validators.email]],
      taxId: this.fb.group({
        taxId: [user.taxId?.taxId, [Validators.required, Validators.pattern(/^\d{11}$/)]]
      }),
      phoneNumber: [user.phoneNumber, [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }
  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)]], // Senha deve ter pelo menos 6 caracteres, uma letra maiúscula e um número]],
      taxId: this.fb.group({
        taxId: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
      }),
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }
  submit() {
    if (this.usersForm.valid) {
      this.onSubmit.emit(this.usersForm.value);
    }
  }
  resetForm() {
  if (this.userData) {
    this.usersForm = this.createFormWithUser(this.userData);
  } else {
    this.usersForm.reset();
  }
}
}
