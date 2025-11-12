import { Component } from '@angular/core';
import { UserInfo } from '../../models/settings.model';
import { SettingsService } from '../../service/settings.service';
import { AuthTokenService } from '../../../../_guard/service/auth-token.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailExistsValidator, emailExistsValidatorButExcludeOriginal } from '../../../../utils/email-exists.validator';
import { UserVerifyService } from '../../../../utils/service/user-verify.service';
import { cpfValidator } from '../../../../utils/cpf.validator';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from "ngx-mask";

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  user: UserInfo | null = null;
  userForm: FormGroup;
  isEditing = false;
  constructor(private settingsService: SettingsService, private authTokenService: AuthTokenService, private fb: FormBuilder, private userVerifyService: UserVerifyService) {
    this.userForm = this.createForm();
  }
  ngOnInit(): void {
    this.getUser();
  }
  createForm(): FormGroup {
    return this.fb.group({
      id: [this.authTokenService.getUserId()],
      firstName: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [{ value: '', disabled: true }, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailExistsValidatorButExcludeOriginal(this.userVerifyService)],
        updateOn: 'blur'
      }],
      taxId: this.fb.group({
        taxId: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\d{11}$/), cpfValidator]]
      }),
      phoneNumber: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }
  getUser() {
    const userId = this.authTokenService.getUserId();
    if (userId) {
      this.settingsService.getUserbyId(userId).subscribe(
        (user: UserInfo) => {
          console.log("Usuário obtido:", user);
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            taxId: {
              taxId: user.taxId.taxId
            },
            phoneNumber: user.phoneNumber,
            email: user.email,
          });
        },
        (error) => {
          console.error("Erro ao buscar o usuário:", error);
        }
      );
    }
  }

  enableEdit(): void {
    this.isEditing = true;
    this.userForm.enable();
    this.userForm.markAllAsTouched();
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.userForm.disable();
    this.getUser();
  }

  changePassword(): void{
    
  }
  updateUser() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      this.settingsService.putUser(this.userForm.get('id')?.value, updatedUser).subscribe({
        next: (response) => {
          console.log('User put successfully:', response);
          this.getUser();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
      this.isEditing = false;
      this.userForm.disable();
    } else {
      console.error('User is null. Cannot update user.');
    }
  }
}
