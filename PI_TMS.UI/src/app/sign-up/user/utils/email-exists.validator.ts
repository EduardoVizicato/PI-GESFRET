import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../service/user.service';

export function emailExistsValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null);
        }

        return userService.checkEmail(control.value).pipe(
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
