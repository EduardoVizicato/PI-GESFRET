import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plateFormat'
})
export class PlateFormatPipe implements PipeTransform {
  transform(value: string): string {
  if (!value) return '';

  const clean = value.replace(/[^a-zA-Z0-9]/g, '');

  if (clean.length !== 7) return value;

  const prefix = clean.slice(0, 3).toUpperCase();
  const fourth = clean.charAt(3);
  const fifth = clean.charAt(4).toUpperCase();
  const rest = clean.slice(5);

  const isSecondFormat = /[A-Z]/i.test(clean.charAt(4));

  if (isSecondFormat) {
    return `${prefix}-${fourth}${fifth}${rest}`;
  } else {
    return `${prefix}-${clean.slice(3)}`;
  }
}
}
