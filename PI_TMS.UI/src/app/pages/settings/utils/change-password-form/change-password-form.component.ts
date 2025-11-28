import { Component, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EventService } from '../../../../shared/service/event.service';
import { ChangePasswordPayload } from '../../models/settings.model';
import { SettingsService } from '../../service/settings.service';
import { TokenService } from '../../../../token/token.service';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit, AfterViewInit {

  changePasswordForm!: FormGroup;

  @Output() loaded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private settings: SettingsService , private eventService: EventService, private token: TokenService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword && confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  ngAfterViewInit(): void {
    this.loaded.emit();
  }

  close(): void {
    this.changePasswordForm.reset();
    this.closeModal.emit();
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const formValue = this.changePasswordForm.value;
    const userEmail = this.token.getUserEmail(); 

    if (!userEmail) {
      this.eventService.showError('Sessão expirada ou inválida. Por favor, faça login novamente.');
      return;
    }

    const payload: ChangePasswordPayload = {
      email: userEmail,
      oldPassword: formValue.currentPassword,
      newPassword: formValue.newPassword,
      confirmPassword: formValue.confirmPassword
    };

    this.settings.changePassword(payload).subscribe(
    (response) => {
        if (response && response.success == true) {
          this.eventService.showSuccess('Senha alterada com sucesso!');
          this.close();
          return;
        }
        this.eventService.showError('Erro ao alterar a senha. Verifique a senha atual e tente novamente.');
      },
      (error) => {
        this.eventService.showError('Erro Inesperado ao alterar a senha. Tente novamente mais tarde.');
      }
    );
  }
  
}   