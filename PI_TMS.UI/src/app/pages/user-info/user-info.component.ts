import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { AuthTokenService } from '../../_guard/service/auth-token.service';
import { UserInfoService } from './service/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInfo } from './models/userInfo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  imports: [SidebarComponent, CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  user: UserInfo | null = null;
  userForm: FormGroup;

  constructor(private authTokenService: AuthTokenService, private userInfoService: UserInfoService, private fb: FormBuilder,) {
    this.userForm = this.createForm();
  }
  ngOnInit(): void {

    this.getUser();
  }
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      taxId: this.fb.group({
        taxId: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]]
      }),
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
    });
  }
  getUser() {
    const userId = this.authTokenService.getUserId();
    if (userId) {
      this.userInfoService.getUserbyId(userId).subscribe(
        (user: UserInfo) => {
          console.log("Usuário obtido:", user);
          this.userForm.patchValue({
            name: user.firstName,
            surname: user.lastName,
            taxId: {
              taxId: user.taxId.taxId
            },
            phone: user.phoneNumber,
            email: user.email,
          });
        },
        (error) => {
          console.error("Erro ao buscar o usuário:", error);
        }
      );
    }
  }
  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      console.log('Usuário atualizado:', updatedUser);
    }
  }
}