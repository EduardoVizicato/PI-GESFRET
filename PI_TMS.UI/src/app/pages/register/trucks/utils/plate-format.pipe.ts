import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plateFormat'
})
export class PlateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const clean = value.replace(/[^a-zA-Z0-9]/g, '');
    if (clean.length !== 7) return value; // se não for no formato esperado, retorna original
    return clean.slice(0, 3).toUpperCase() + '-' + clean.slice(3);
  }
}
