import { Component } from '@angular/core';
import { user } from './models/user.model';
import { UsersService } from './services/users.service';
import { CommonModule } from '@angular/common';
import { TaxFormatPipe } from "./utils/taxPipe/tax-format.pipe";
import { PhoneFormatPipe } from "./utils/phonePipe/phone-format.pipe";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from "./utils/modal/modal.component";
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-users',
  imports: [CommonModule, TaxFormatPipe, ReactiveFormsModule, PhoneFormatPipe, ModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'

})
export class UsersComponent {
  users: user[] = [];
  modalMode: 'add' | 'edit' = 'add';
  modalTitle = '';
  selectedUser: user | undefined = undefined;

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
      this.addUser();
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
  addUser() {

  }
  updateUser(user: user) {
    throw new Error('Method not implemented.');
  }

}
