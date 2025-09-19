import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZipCodeData, ZipCodeService } from '../../service/zip-code/zip-code.service';
import { City, CityService } from '../../service/city/city.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PlateFormatPipe } from '../PlateFormat/plate-format.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-routes-options',
  imports: [
    AsyncPipe,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    CurrencyMaskModule,
    NgxMaskDirective
  ],
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


  selectCity(city: City, type: 'origin' | 'destination', event: MouseEvent): void {
    event.preventDefault();
    const cityName = `${city.nome}/${city.estado}`;

    if (type === 'origin') {
      this.parentForm.get('route.origin.city')?.patchValue({ city: cityName });
      this.showSuggestionsOrigin = false;
      console.log(this.parentForm.get('route.origin.city')?.value);
    } else {

      this.parentForm.get('route.destination.city')?.patchValue({ city: cityName });
      this.showSuggestionsDestination = false;
    }
  }

  searchZipCode(event: Event, type: 'origin' | 'destination'): void {
    const input = event.target as HTMLInputElement;
    const zipCode = input.value;
    if (type === 'origin') {
      this.zipCodeService.searchZipCode(zipCode).subscribe((data: ZipCodeData | null) => {
        const routeGroup = this.parentForm.get('route.origin') as FormGroup;
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
    } else if (type === 'destination') {
      this.zipCodeService.searchZipCode(zipCode).subscribe((data: ZipCodeData | null) => {
        const routeGroup = this.parentForm.get('route.destination') as FormGroup;
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
  }
  updateTypeAddress(type: string): void {
    this.selectedAddressType = type;
    this.parentForm.get('route')?.reset();
  }
}