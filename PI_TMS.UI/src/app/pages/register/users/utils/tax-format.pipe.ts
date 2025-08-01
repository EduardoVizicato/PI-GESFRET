import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taxFormat'
})
export class TaxFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const clean = value.replace(/\D/g, '');

    if (clean.length !== 11) return value;

    return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`;
  }


}
