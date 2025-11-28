import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export type AlertType = 'success' | 'error';

export interface AlertPayload {
  message: string;
  type: AlertType;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private alertSubject = new Subject<AlertPayload>();

  onAlert() {
    return this.alertSubject.asObservable();
  }

  showAlert(message: string, type: AlertType = 'error') {
    this.alertSubject.next({ message, type });
  }

  showError(message: string) {
    this.showAlert(message, 'error');
  }

  showSuccess(message: string) {
    this.showAlert(message, 'success');
  }
}
