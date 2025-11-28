import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-notification',
  imports: [NgIf],
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.css']
})
export class AlertNotificationComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'error';

  show: boolean = true;

  close() {
    this.show = false;
  }

  get label(): string {
    return this.type === 'success' ? 'Success' : 'Alert';
  }
}