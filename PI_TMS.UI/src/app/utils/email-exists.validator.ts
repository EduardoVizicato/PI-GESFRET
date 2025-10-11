import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserVerifyService } from './service/user-verify.service';

export function emailExistsValidator(UserVerifyService: UserVerifyService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null);
        }

        return UserVerifyService.checkEmail(control.value).pipe(
            map(response => {
                // return response.exists ? { emailTaken: true } : null;
                console.log('Email exists:', response);
                if (response == null) {
                    return false ? { emailTaken: false } : null;
                }
                return true ? { emailTaken: true } : null;

            }),
            catchError(() => of(null))
        );
    };
}
export function emailExistsValidatorButExcludeOriginal(
    UserVerifyService: UserVerifyService,
): AsyncValidatorFn {
    // Normalizamos uma vez para evitar repetir operações em cada emissão.
    
    let original: string | null = null;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if(!original){
            original = (control.value || '').trim().toLowerCase();
        }
        const currentRaw = control.value;
        console.log('Validando e-mail:', currentRaw, 'Original a excluir:', original);
        if (!currentRaw) {
            return of(null);
        }

        const current = String(currentRaw).trim().toLowerCase();

        // 1. Se o usuário não alterou o e-mail, não validar (retorna null).
        if (current === original) {
            return of(null);
        }

        // 2. Consulta ao serviço apenas se realmente mudou.
        return UserVerifyService.checkEmail(currentRaw).pipe(
            map(response => {
                // Adapte esta linha conforme o formato real retornado pelo serviço:
                // Se for { exists: boolean }:
                console.log('Email exists:', response);
                if (response == null) {
                    return false ? { emailTaken: false } : null;
                }
                return true ? { emailTaken: true } : null;


                // Se existe e NÃO é o original (já filtramos original acima):
            }),
            catchError(err => {
                console.error('Erro ao verificar e-mail:', err);
                // Em caso de erro na API, geralmente retornamos null para não travar o usuário.
                return of(null);
            })
        );
    };
}