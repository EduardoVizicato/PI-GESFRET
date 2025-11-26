import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VerifyMailService } from './services/verify-mail.service';

@Component({
  selector: 'app-verify-mail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verify-mail.component.html',
  styleUrl: './verify-mail.component.css'
})
export class VerifyMailComponent {
  code: string[] = new Array(6).fill('');
  email: string = '';

  @ViewChildren('codeInput') inputs!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private verifyMailService: VerifyMailService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { email: string } || history.state;
    
    if (state && state.email) {
      this.email = state.email;
    } else {
      console.warn('Email não encontrado no estado da navegação.');
      // this.router.navigate(['/signUp-user']);
    }
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    
    this.code[index] = sanitizedValue;
    input.value = sanitizedValue;
  }

  onKeyUp(event: KeyboardEvent, index: number): void {
    const inputElement = this.inputs.toArray()[index].nativeElement as HTMLInputElement;
    
    if (event.key >= '0' && event.key <= '9' && inputElement.value) {
      if (index < this.code.length - 1) {
        this.inputs.toArray()[index + 1].nativeElement.focus();
      }
    } else if (event.key === 'Backspace' && !inputElement.value) {
      if (index > 0) {
        this.inputs.toArray()[index - 1].nativeElement.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent, startIndex: number): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text').trim();
    if (pastedData) {
      const digitsOnly = pastedData.replace(/[^0-9]/g, '');
      const remainingLength = this.code.length - startIndex;
      const charactersToPaste = digitsOnly.slice(0, remainingLength).split('');
      
      charactersToPaste.forEach((char, i) => {
        const currentIndex = startIndex + i;
        if (currentIndex < this.code.length) {
            this.code[currentIndex] = char;
            const nextInputIndex = Math.min(currentIndex + 1, this.code.length - 1);
            this.inputs.toArray()[nextInputIndex].nativeElement.focus();
        }
      });
    }
  }

  isCodeIncomplete(): boolean {
    return this.code.some(digit => digit === '');
  }

  verifyCode(): void {
    if (this.isCodeIncomplete()) return;

    if (!this.email) {
      alert('Erro: Email não identificado. Por favor, realize o cadastro novamente.');
      return;
    }

    const fullCode = this.code.join('');
    
    this.verifyMailService.verify(this.email, fullCode).subscribe({
      next: (response) => {
        console.log('Verificação realizada com sucesso:', response);

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro na verificação:', error);
        alert('Código inválido ou expirado. Tente novamente.');
        // this.code = new Array(6).fill('');
      }
    });
  }
}