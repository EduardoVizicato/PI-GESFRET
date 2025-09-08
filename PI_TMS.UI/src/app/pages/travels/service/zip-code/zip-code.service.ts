// travels/service/zip-code.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ZipCodeData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  private readonly apiUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  searchZipCode(zipCode: string): Observable<ZipCodeData | null> {
    const cleanedZipCode = zipCode.replace(/\D/g, '');

    if (cleanedZipCode.length !== 8) {
      return of(null);
    }

    return this.http.get<ZipCodeData>(`${this.apiUrl}${cleanedZipCode}/json/`).pipe(
      map(data => data.erro ? null : data),
      catchError(error => {
        console.error('Erro ao buscar CEP:', error);
        return of(null);
      })
    );
  }
}