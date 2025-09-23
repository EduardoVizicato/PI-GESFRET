import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { AuthTokenService } from '../../_guard/service/auth-token.service';
import { UserInfoService } from './service/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInfo } from './models/userInfo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailExistsValidator } from '../../sign-up/user/utils/email-exists.validator';
import { cpfValidator } from '../../sign-up/user/utils/cpf.validator';
import { UserService } from '../../sign-up/user/service/user.service';


@Component({
  selector: 'app-user-info',
  imports: [SidebarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  user: UserInfo | null = null;
  userForm: FormGroup;
  isEditing = false;


  constructor(private userService: UserService, private authTokenService: AuthTokenService, private userInfoService: UserInfoService, private fb: FormBuilder,) {
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
        asyncValidators: [emailExistsValidator(this.userService)],
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
      this.userInfoService.getUserbyId(userId).subscribe(
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
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.userForm.disable();
  }

  updateUser() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      this.userInfoService.putUser(this.userForm.get('id')?.value, updatedUser).subscribe({
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
