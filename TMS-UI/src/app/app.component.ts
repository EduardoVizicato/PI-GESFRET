import { Component } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './auth/login/login.component.html',
})
export class AppComponent {
  constructor(private router: Router) {
  }
  title = 'TMS-UI';
  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => window.HSStaticMethods.autoInit(), 100);
      }
    });
  }
}
