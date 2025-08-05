import { Component, ViewChild } from '@angular/core';
import { user } from './models/user.model';
import { UsersService } from './services/users.service';
import { CommonModule } from '@angular/common';
import { TaxFormatPipe } from "./utils/taxPipe/tax-format.pipe";
import { PhoneFormatPipe } from "./utils/phonePipe/phone-format.pipe";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from "./utils/modal/modal.component";
import Modal from 'bootstrap/js/dist/modal';
import { DateFormatPipe } from "./utils/datePipe/date-format.pipe";

@Component({
  selector: 'app-users',
  imports: [CommonModule, TaxFormatPipe, ReactiveFormsModule, PhoneFormatPipe, ModalComponent, DateFormatPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'

})
export class UsersComponent {
  @ViewChild(ModalComponent) userModalComponent!: ModalComponent;
  users: user[] = [];
  modalMode: 'add' | 'edit' = 'add';
  modalTitle = '';
  selectedUser: user | undefined = undefined;
  viewUser: user | null = null;

  constructor(private usersService: UsersService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.getUserbyEnterprise();
  }

  openModal(mode: 'add' | 'edit', user?: user) {
    this.modalMode = mode;
    this.modalTitle = mode === 'add' ? 'Adicionar Usuário' : 'Editar Usuário';
    this.selectedUser = user ?? undefined;
    const modalElement = document.getElementById('userModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }

  handleUserSubmit(user: user) {
    if (this.modalMode === 'add') {
      this.addUser(user);
    } else {
      this.updateUser(user);
    }
  }
  getUserbyEnterprise() {
    this.usersService.getUsers().subscribe({
      next: (response: user[]) => {
        this.users = response;
        console.log('Usuários obtidos com sucesso:', this.users);
      },
      error: (error: any) => {
        console.error('Erro ao obter usuários:', error);
      }
    });
  }
  addUser(userData: user) {
    this.usersService.addUsers(userData).subscribe({
      next: (response: any) => {
        console.log('Usuário adicionado com sucesso');
        this.getUserbyEnterprise();
        const modalElement = document.getElementById('userModal');
        if (modalElement) {
          const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
          modalInstance.hide();
        }
      }, error: (err) => {
        console.error('Erro ao adicionar usuário', err);
      }
    });
    this.userModalComponent.resetForm();
  }
  updateUser(user: user) {
    this.usersService.updateUsers(user.id, user).subscribe({
      next: (response) => {
        console.log('Usuário atualizado com sucesso', response);
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário', err);
      }
    });
  }
  deleteUser(user: user) {
    this.usersService.desactiveUsers(user.id).subscribe({
      next: (response) => {
        console.log('Usuário desativado com sucesso', response);
        this.getUserbyEnterprise();
      },
      error: (err) => {
        console.error('Erro ao desativar usuário', err);
      }
    });
  }
  openViewModal(user: user) {
    this.viewUser = user
  }

}
