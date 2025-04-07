import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './auth/login/login.component.html',
})
export class AppComponent {
  title = 'TMS-UI';
}
