import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private errorSubject = new Subject<string>();

  onError() {
    return this.errorSubject.asObservable();
  }

  showError(message: string) {
    this.errorSubject.next(message);
  }
}
