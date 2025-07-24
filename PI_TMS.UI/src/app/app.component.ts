import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventService } from './shared/service/event.service';
import { AlertNotificationComponent } from './shared/alert-notification/alert-notification.component';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private eventService: EventService) {
    this.eventService.onError().subscribe(message => {
      this.errorMessage = message;
      this.showError = true;

      // Fecha a notificação após 5 segundos
      setTimeout(() => this.showError = false, 5000);
    });
  }
}
