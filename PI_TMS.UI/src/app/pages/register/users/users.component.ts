import { Component, ViewChild } from '@angular/core';
import { user } from './models/user.model';
import { UsersService } from './services/users.service';
import { CommonModule } from '@angular/common';
import { TaxFormatPipe } from "./utils/taxPipe/tax-format.pipe";
import { PhoneFormatPipe } from "./utils/phonePipe/phone-format.pipe";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from "./utils/modalAdd/modal.component";
import Modal from 'bootstrap/js/dist/modal';
import { DateFormatPipe } from "./utils/datePipe/date-format.pipe";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateModalComponent } from './utils/update-modal/update-modal.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, TaxFormatPipe, ReactiveFormsModule, PhoneFormatPipe, ModalComponent, DateFormatPipe, NgbPaginationModule, UpdateModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'

})
export class UsersComponent {
  @ViewChild(ModalComponent) userModalComponent!: ModalComponent;
  @ViewChild(UpdateModalComponent) UpdateModalComponent!: UpdateModalComponent;
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  users: user[] = [];
  selectedUser: user | null = null;
  viewUser: user | null = null;

  constructor(private usersService: UsersService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.getUserbyEnterprise();
  }

  openModalAdd() {
    const modalElement = document.getElementById('userModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }
  openModalUpdate(user: user) {
    const modalElement = document.getElementById('updateUserModal');

    if (modalElement) {
      const ModalUpdate = new Modal(modalElement);

      this.UpdateModalComponent.loadItem(user);

      ModalUpdate.show();
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }

  handleUserSubmit(user: user) {
    this.addUser(user);
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
  get filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(u =>
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.taxId.taxId.toLowerCase().includes(term) ||
      u.phoneNumber.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
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
