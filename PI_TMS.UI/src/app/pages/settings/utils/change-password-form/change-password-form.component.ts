import { Component, AfterViewInit, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent implements OnInit, AfterViewInit {

  @ViewChild('changePasswordNgForm') changePasswordForm!: NgForm;

  @Output() loaded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.changePasswordForm) {
        this.changePasswordForm.resetForm();
      }
    }, 0);
  }

  ngAfterViewInit(): void {
    this.loaded.emit();
  }

  close(): void {
    if (this.changePasswordForm) {
      this.changePasswordForm.resetForm();
    }
    this.closeModal.emit();
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      Object.values(this.changePasswordForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    console.log('Formulário de alterar senha enviado!', this.changePasswordForm.value);

    this.close();
  }
}