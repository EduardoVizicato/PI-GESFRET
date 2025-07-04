import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  onInit(mainContainer: HTMLElement): void {
    mainContainer.classList.add('active');
  }
}
