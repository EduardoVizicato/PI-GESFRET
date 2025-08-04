import { Component } from '@angular/core';
import { NgxCurrencyDirective } from "ngx-currency";

@Component({
  selector: 'app-traveltest',
  imports: [NgxCurrencyDirective],
  templateUrl: './traveltest.component.html',
  styleUrl: './traveltest.component.css'
})
export class TraveltestComponent {
  weightvalue: number = 0;
  freightvalue: number = 0;

  weightOptions = {
    prefix: '',
    thousands: '.',
    decimal: ',',
    precision: 3,
    allowNegative: false,
  };

  valueOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
  };

  setCursorEnd(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const valueLength = inputElement.value.length;
    setTimeout(() => {
      inputElement.setSelectionRange(valueLength, valueLength);
    }, 0);
  }
}
