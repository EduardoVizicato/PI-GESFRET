import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return 'Sem Atualização';

    const date = new Date(value);

    const pad = (num: number): string => num.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // meses começam em 0
    const year = date.getFullYear().toString().slice(-2); // últimos dois dígitos do ano

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

}
