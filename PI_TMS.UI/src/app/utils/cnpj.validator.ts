import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null;

    // Remove caracteres não numéricos
    const cnpj = value.replace(/\D/g, '');

    // CNPJ precisa ter 14 dígitos
    if (cnpj.length !== 14) {
        return { cnpjInvalid: true };
    }

    // Elimina CNPJs inválidos conhecidos (11111111111111, 22222222222222, etc.)
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return { cnpjInvalid: true };
    }

    // Validação do 1º dígito verificador
    let length = 12;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) {
        return { cnpjInvalid: true };
    }

    // Validação do 2º dígito verificador
    length = 13;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) {
        return { cnpjInvalid: true };
    }

    return null;
}