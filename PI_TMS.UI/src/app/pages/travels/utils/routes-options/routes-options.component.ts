import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ZipCodeData, ZipCodeService } from '../../service/zip-code/zip-code.service';
import { City, CityService } from '../../service/city/city.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-routes-options',
  imports: [AsyncPipe],
  templateUrl: './routes-options.component.html',
  styleUrl: './routes-options.component.css'
})
export class RoutesOptionsComponent {
  @Input() parentForm!: FormGroup;

  selectedAddressType: any = 'simple';
  showSuggestionsOrigin = false;
  showSuggestionsDestination = false;

  citiesOrigin$!: Observable<City[]>;
  citiesDestination$!: Observable<City[]>;
  private searchOriginTerms = new Subject<string>();
  private searchDestinationTerms = new Subject<string>();

  constructor(private zipCodeService: ZipCodeService, private cityService: CityService) { }

  ngOnInit(): void {
    this.citiesOrigin$ = this.searchOriginTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.searchCities(term)),
    );

    this.citiesDestination$ = this.searchDestinationTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.searchCities(term)),
    );
  }

  search(event: Event, type: 'origin' | 'destination'): void {
    const term = (event.target as HTMLInputElement).value;
    if (type === 'origin') {
      this.showSuggestionsOrigin = term.length > 1;
      this.searchOriginTerms.next(term);
    } else {
      this.showSuggestionsDestination = term.length > 1;
      this.searchDestinationTerms.next(term);
    }
  }

  /**
   * ATUALIZAÇÃO AQUI 👇
   * O método patchValue foi ajustado para refletir a nova estrutura aninhada, 
   * onde 'origin' e 'destination' são FormGroups que contêm um FormControl 'city'.
   */
  selectCity(city: City, type: 'origin' | 'destination', event: MouseEvent): void {
    event.preventDefault();
    const cityName = `${city.nome}/${city.estado}`;

    if (type === 'origin') {
      // Modificado para atualizar o controle 'city' dentro do grupo 'origin'
      this.parentForm.get('route.origin')?.patchValue({ city: cityName });
      this.showSuggestionsOrigin = false;
    } else {
      // Modificado para atualizar o controle 'city' dentro do grupo 'destination'
      this.parentForm.get('route.destination')?.patchValue({ city: cityName });
      this.showSuggestionsDestination = false;
    }
  }

  searchZipCode(event: Event): void {
    const input = event.target as HTMLInputElement;
    const zipCode = input.value;

    this.zipCodeService.searchZipCode(zipCode).subscribe((data: ZipCodeData | null) => {
      const routeGroup = this.parentForm.get('route') as FormGroup;
      if (data) {
        routeGroup.patchValue({
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,

        });
      } else {
        routeGroup.patchValue({
          street: '',
          neighborhood: '',
          city: '',
          state: '',
        });
      }
    });
  }
  updateTypeAddress(type: string): void {
    this.selectedAddressType = type;
    this.parentForm.get('route')?.reset();
  }
}