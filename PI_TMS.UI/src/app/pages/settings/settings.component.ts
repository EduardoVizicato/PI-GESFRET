import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from "./utils/user-form/user-form.component";
import { EnterpriseFormComponent } from "./utils/enterprise-form/enterprise-form.component";

@Component({
  selector: 'app-settings',
  imports: [SidebarComponent, CommonModule, FormsModule, ReactiveFormsModule, UserFormComponent, EnterpriseFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
