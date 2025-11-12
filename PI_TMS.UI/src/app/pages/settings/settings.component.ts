import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from "./utils/user-form/user-form.component";
import { EnterpriseFormComponent } from "./utils/enterprise-form/enterprise-form.component";
import { ChangePasswordFormComponent } from "./utils/change-password-form/change-password-form.component";
import { Component, signal, WritableSignal } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    EnterpriseFormComponent,
    UserFormComponent,
    ChangePasswordFormComponent 
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  showChangePasswordModal: WritableSignal<boolean> = signal(false);

  constructor() { }

  openChangePasswordModal(): void {
    this.showChangePasswordModal.set(true);
  }

  onChangePasswordModalLoaded(): void {
    this.openModal('changePasswordModal');
  }

  private openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  closeChangePasswordModal(): void {
    const modalElement = document.getElementById('changePasswordModal');
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.showChangePasswordModal.set(false);
      }, { once: true });
    }
  }
}
