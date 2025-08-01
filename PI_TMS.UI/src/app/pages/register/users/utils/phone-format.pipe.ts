import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): string {
  if (!value) return '';

  // Remove tudo que não for número
  const clean = value.replace(/\D/g, '');

  // Telefone celular com DDD: total de 11 dígitos
  if (clean.length !== 11) return value;

  const ddd = clean.slice(0, 2);
  const firstPart = clean.slice(2, 7);
  const secondPart = clean.slice(7);

  return `(${ddd}) ${firstPart}-${secondPart}`;
}

}
