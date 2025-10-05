import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../service/settings.service';
import { CommonModule } from '@angular/common';
import { EnterpriseInfo } from '../../models/settings.model';
import { emailExistsValidator } from '../../../../utils/email-exists.validator';
import { UserVerifyService } from '../../../../utils/service/user-verify.service';
import { AuthTokenService } from '../../../../_guard/service/auth-token.service';
import { cnpjValidator } from '../../../../utils/cnpj.validator';
import { NgxMaskDirective } from "ngx-mask";

@Component({
  selector: 'app-enterprise-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './enterprise-form.component.html',
  styleUrl: './enterprise-form.component.css'
})
export class EnterpriseFormComponent {
  enterprise: EnterpriseInfo | null = null;
  enterpriseForm: FormGroup<any>;
  isEditing = false;
  constructor(private settingsService: SettingsService, private fb: FormBuilder, private authTokenService: AuthTokenService, private userVerifyService: UserVerifyService) {
    this.enterpriseForm = this.createForm();
  }
  ngOnInit(): void {
    this.getEnterprise();
  }
  createForm(): FormGroup {
    return this.fb.group({
      id: [{ value: '', disabled: true }],
      enterpriseName: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      enterpriseEmail: [{ value: '', disabled: true }, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailExistsValidator(this.userVerifyService)],
        updateOn: 'blur'
      }],
      enterpriseTaxId: this.fb.group({
        enterpriseTaxId: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\d{14}$/), cnpjValidator]]
      }),
    });
  }
  getEnterprise() {
    const enterpriseId = this.authTokenService.getEnterpriseId();
    if (enterpriseId) {
      this.settingsService.getUserbyId(enterpriseId).subscribe(
        (enterprise: any) => {
          this.enterpriseForm.patchValue({
            enterpriseName: enterprise.name,
            enterpriseemail: enterprise.email,
            enterprisetaxId: {
              enterprisetaxId: enterprise.taxId?.taxId
            }
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
    this.enterpriseForm.enable();
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.enterpriseForm.disable();
  }
  updateEnterprise() {
    if (this.enterpriseForm.valid) {
    //   const updatedEnterprise = this.enterpriseForm.value;
    //   this.settingsService.putEnterprise(this.enterpriseForm.get('id')?.value, updatedEnterprise).subscribe({
    //     next: (response) => {
    //       console.log('Enterprise put successfully:', response);
    //       this.getEnterprise();
    //     },
    //     error: (error) => {
    //       console.error('Error updating enterprise:', error);
    //     }
    //   });
    //   this.isEditing = false;
    //   this.enterpriseForm.disable();
    // } else {
    //   console.error('Enterprise is null. Cannot update enterprise.');
    }
  }
}
