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
  show: boolean = true;

  close() {
    this.show = false;
  }
}