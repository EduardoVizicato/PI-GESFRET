import { Component } from '@angular/core';
import { Router ,RouterOutlet, NavigationEnd } from '@angular/router';
import { EventService } from './shared/service/event.service';
import { AlertNotificationComponent } from './shared/alert-notification/alert-notification.component';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from './contrast/theme.service';

@Component({
  selector: 'app-root',
  standalone: true, // 👉 Isso é essencial para usar "imports" dentro do componente
  imports: [
    RouterOutlet,
    AlertNotificationComponent,
    NgIf,
    ReactiveFormsModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ← Corrigido: estava errado ("styleUrl")
})
export class AppComponent {
  showError = false;
  errorMessage = '';
  title = 'PI_TMS.UI';
  isLoginPage = false;
  isRegisterPage = false;
  isTelaInicio = false;

  constructor(private eventService: EventService, public themeService: ThemeService, private router: Router) {
    this.eventService.onError().subscribe(message => {
      this.errorMessage = message;
      this.showError = true;

      // Fecha a notificação após 5 segundos
      setTimeout(() => this.showError = false, 5000);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects.startsWith('/login');
        this.isRegisterPage = event.urlAfterRedirects.startsWith('/signUp-enterprise');
        this.isTelaInicio = event.urlAfterRedirects.startsWith('/');
      }
    });
 } 
  toggleTheme(){
    this.themeService.toggleTheme();
  }


}


