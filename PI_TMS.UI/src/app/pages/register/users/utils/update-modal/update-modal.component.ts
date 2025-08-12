import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { user } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-update-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent {
  @Output() onSubmit = new EventEmitter<user>();
  usersForm!: FormGroup;
  userSelect!: user;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.usersForm = this.createForm();
  }
  loadItem(user: user) {
    this.userSelect = user;
    this.usersForm = this.createForm(); // recria form com dados novos
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: [this.userSelect?.firstName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [this.userSelect?.lastName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [this.userSelect?.email || '', [Validators.required, Validators.email]],
      taxId: this.fb.group({
        taxId: [this.userSelect?.taxId?.taxId || '', [Validators.required, Validators.pattern(/^\d{11}$/)]]
      }),
      phoneNumber: [this.userSelect?.phoneNumber || '', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)]]
    });
  }
  submit() {
    if (this.usersForm.valid) {
      this.onSubmit.emit(this.usersForm.value);
    }
  }
  resetForm() {

    this.usersForm.reset();

  }
}
