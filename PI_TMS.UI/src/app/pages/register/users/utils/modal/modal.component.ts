import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { user } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() userData: user | null = null;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';
  @Output() onSubmit = new EventEmitter<user>();
  usersForm: FormGroup;

  constructor(private fb: FormBuilder) { this.usersForm = this.createForm(); }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      taxId: this.fb.group({
        taxId: ['']
      }),
      password: ['']
    });
  }
  submit() {
    if (this.usersForm.valid) {
      this.onSubmit.emit(this.usersForm.value);
    }
  }
}
