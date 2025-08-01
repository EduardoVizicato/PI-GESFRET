import { Component } from '@angular/core';
import { user } from './models/user.model';
import { UsersService } from './services/users.service';
import { CommonModule } from '@angular/common';
import { TaxFormatPipe } from "./utils/tax-format.pipe";
import { PhoneFormatPipe } from "./utils/phone-format.pipe";

@Component({
  selector: 'app-users',
  imports: [CommonModule, TaxFormatPipe, PhoneFormatPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: user[] = [];

  constructor(private usersService: UsersService) { }
  ngOnInit(): void {
    this.getUserbyEnterprise();
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

  }
