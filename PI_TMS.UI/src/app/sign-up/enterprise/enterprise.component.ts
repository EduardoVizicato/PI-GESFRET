import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-enterprise',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './enterprise.component.html',
  styleUrl: './enterprise.component.css'
})
export class EnterpriseComponent {
  constructor(private router: Router) { }
  
  onSubmit(mainContainer: HTMLElement): void {
    mainContainer.classList.add('active');
    setTimeout(() => {
      this.router.navigate(['/signUp-user']);
    }, 1500);
  }


}
