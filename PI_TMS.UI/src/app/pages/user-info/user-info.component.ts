import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { AuthTokenService } from '../../_guard/service/auth-token.service';
import { UserInfoService } from './service/user-info.service';
import { UserInfo } from './models/userInfo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  imports: [SidebarComponent,CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  info: UserInfo[] = [];

  constructor(private authTokenService: AuthTokenService, private userInfoService: UserInfoService) {

  }
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    const userId = this.authTokenService.getUserId();
    if (userId) {
      this.userInfoService.getUserbyId(userId).subscribe(
        (response) => {
          console.log(response);
          this.info = response;
          console.log(this.info);
        },

      );
    } 
  }

}
