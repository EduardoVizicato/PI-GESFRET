import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { AuthTokenService } from '../../_guard/service/auth-token.service';
import { UserInfoService } from './service/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserInfo } from './models/userInfo.model';

@Component({
  selector: 'app-user-info',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
   user: UserInfo | null = null;


  constructor(private authTokenService: AuthTokenService, private userInfoService: UserInfoService) {

  }
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    const userId = this.authTokenService.getUserId();
    if (userId) {
      this.userInfoService.getUserbyId(userId).subscribe(
        (response: UserInfo) => {
          console.log(response);
          this.user = response;
        },
        (error) => {
          console.error("Erro ao buscar o usuário:", error);
        }
      );
    } 
  }

}
