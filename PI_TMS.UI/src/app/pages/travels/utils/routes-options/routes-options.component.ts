import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZipCodeData, ZipCodeService } from '../../service/zip-code/zip-code.service';
import { City, CityService } from '../../service/city/city.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PlateFormatPipe } from '../../../../utils/Formats/PlateFormat/plate-format.pipe';
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
      this.parentForm.get('origin.city')?.setValue(city.nome);
      this.parentForm.get('origin.state')?.setValue(city.estado);
      this.showSuggestionsOrigin = false;
    } else {
      this.parentForm.get('destination.city')?.setValue(city.nome);
      this.parentForm.get('destination.state')?.setValue(city.estado);
      this.showSuggestionsDestination = false;
    }
  }
  searchZipCode(event: Event, type: 'origin' | 'destination'): void {
    const input = event.target as HTMLInputElement;
    const zipCode = input.value;
    if (type === 'origin') {
      this.zipCodeService.searchZipCode(zipCode).subscribe((data: ZipCodeData | null) => {
        const routeGroup = this.parentForm.get('origin') as FormGroup;
        if (data) {
          routeGroup.patchValue({
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          });
          console.log(data)
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
        const routeGroup = this.parentForm.get('destination') as FormGroup;
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

    const stateControlDest = this.parentForm.get('destination.state') ?? this.parentForm.get('destination')?.get('state');
    const stateControlOrig = this.parentForm.get('origin.state') ?? this.parentForm.get('origin')?.get('state');

    if (!stateControlDest || !stateControlOrig) {
      console.warn('Controle destination.state ou origin.state não encontrado');
      return;
    }

    if (type === 'simple') {
      stateControlDest.disable({ onlySelf: true }); 
      stateControlOrig.disable({ onlySelf: true });
      // console.log("Endereço Simples selecionado");

    } else if (type === 'complete') {
      stateControlDest.enable({ onlySelf: true });
      stateControlOrig.enable({ onlySelf: true });
      // console.log("Endereço completo selecionado");
    }

    this.parentForm.get('route')?.reset();
  }
}