import { Component } from '@angular/core';
import { user } from './models/user.model';
import { UsersService } from './services/users.service';
import { CommonModule } from '@angular/common';
import { TaxFormatPipe } from "./utils/tax-format.pipe";
import { PhoneFormatPipe } from "./utils/phone-format.pipe";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, TaxFormatPipe, ReactiveFormsModule, PhoneFormatPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: user[] = [];
  usersForm: FormGroup;

  constructor(private usersService: UsersService, private fb: FormBuilder) { 
    this.usersForm = this.createForm();
  }
  ngOnInit(): void {
    this.getUserbyEnterprise();
  }
  createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      taxId: this.fb.group({
        taxId: ['']
      }),
      password: ['']
    });
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
  addUser(){

  }

}
