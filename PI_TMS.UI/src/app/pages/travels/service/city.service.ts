import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';

export interface City {
  nome: string;
  estado: string;
}

interface IbgeCity {
  id: number;
  nome: string;
  microrregiao?: {
    id: number;
    nome: string;
    mesorregiao?: {
      id: number;
      nome: string;
      UF?: {
        id: number;
        sigla: string;
        nome: string;
        regiao?: {
          id: number;
          sigla: string;
          nome: string;
        };
      };
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private citiesCache$: Observable<City[]> | null = null;
  private readonly IBGE_API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome';

  constructor(private http: HttpClient) {}

  private getCities(): Observable<City[]> {
    if (!this.citiesCache$) {
      this.citiesCache$ = this.http.get<IbgeCity[]>(this.IBGE_API_URL).pipe(
        map(ibgeCities => ibgeCities.map(city => ({
          nome: city.nome,
          estado: city.microrregiao?.mesorregiao?.UF?.sigla || ''
        }))),
        shareReplay(1),
        catchError(error => {
          console.error('Erro ao buscar cidades da API do IBGE:', error);
          return of([]);
        })
      );
    }
    return this.citiesCache$;
  }

  searchCities(term: string): Observable<City[]> {
    if (!term || term.trim().length < 1) {
      return of([]);
    }

    return this.getCities().pipe(
      map(cities =>
        cities.filter(city =>
          `${city.nome}/${city.estado}`.toLowerCase().includes(term.toLowerCase())
        ).slice(0, 10)
      )
    );
  }
}