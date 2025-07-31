import { Component } from '@angular/core';
import { user } from '../../../sign-up/user/model/user.model';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: user[] = [];


  getUserbyEnterprise(){

  }
}
