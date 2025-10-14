import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightFormat'
})
export class WeightFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == null) return '';
    // Converte para número, caso venha como string
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;

    // Formata com separador de milhar e duas casas decimais (opcional)
    // Para não ter casas decimais, use { minimumFractionDigits: 0, maximumFractionDigits: 0 }
    const formatted = numberValue.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return `${formatted} Kg`;
  }

}
