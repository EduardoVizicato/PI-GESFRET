import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) return null;
    if (value.length < 11) return null;

    // Remove caracteres não numéricos
    const cpf = value.replace(/\D/g, '');

    // CPF precisa ter 11 dígitos
    if (cpf.length !== 11) {
        return { cpfInvalid: true };
    }

    // Elimina CPFs inválidos conhecidos (11111111111, 22222222222, etc.)
    if (/^(\d)\1{10}$/.test(cpf)) {
        return { cpfInvalid: true };
    }

    // Validação do 1º dígito
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (sum * 10) % 11;
    resto = resto === 10 ? 0 : resto;
    if (resto !== parseInt(cpf.charAt(9))) {
        return { cpfInvalid: true };
    }

    // Validação do 2º dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (sum * 10) % 11;
    resto = resto === 10 ? 0 : resto;
    if (resto !== parseInt(cpf.charAt(10))) {
        return { cpfInvalid: true };
    }

    return null;
}
