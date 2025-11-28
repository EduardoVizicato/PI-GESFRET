import { Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { EventService, AlertPayload } from './shared/service/event.service';
import { AlertNotificationComponent } from './shared/alert-notification/alert-notification.component';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from './contrast/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AlertNotificationComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'error';

  title = 'PI_TMS.UI';
  isLoginPage = false;
  isRegisterPage = false;
  isTelaInicio = false;

  private sub = new Subscription();

  constructor(
    private eventService: EventService,
    public themeService: ThemeService,
    private router: Router
  ) {
    const alertSub = this.eventService.onAlert().subscribe((payload: AlertPayload) => {
      this.alertMessage = payload.message;
      this.alertType = payload.type;
      this.showAlert = true;

      setTimeout(() => this.showAlert = false, 5000);
    });

    this.sub.add(alertSub);

    const routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects.startsWith('/login');
        this.isRegisterPage = event.urlAfterRedirects.startsWith('/signUp-enterprise');
        this.isTelaInicio = event.urlAfterRedirects.startsWith('/');
      }
    });

    this.sub.add(routerSub);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}