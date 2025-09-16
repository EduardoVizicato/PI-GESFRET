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
  travelForm: FormGroup;
  selectedAddressType: any = 'simple';
  showSuggestionsOrigin = false;
  showSuggestionsDestination = false;

  citiesOrigin$!: Observable<City[]>;
  citiesDestination$!: Observable<City[]>;
  private searchOriginTerms = new Subject<string>();
  private searchDestinationTerms = new Subject<string>();

  constructor(private fb: FormBuilder,
    private zipCodeService: ZipCodeService, private cityService: CityService) { this.travelForm = this.createForm(); }

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
      this.travelForm.get('route')?.patchValue({ origin: cityName });
      this.showSuggestionsOrigin = false;
    } else {
      this.travelForm.get('route')?.patchValue({ destination: cityName });
      this.showSuggestionsDestination = false;
    }
  }

  searchZipCode(event: Event): void {
    const input = event.target as HTMLInputElement;
    const zipCode = input.value;

    this.zipCodeService.searchZipCode(zipCode).subscribe((data: ZipCodeData | null) => {
      const routeGroup = this.travelForm.get('route') as FormGroup;
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

  createForm(): FormGroup {
    return this.fb.group({
      route: this.fb.group({
        origin: this.fb.group({
          zipCode: [''],
          street: [''],
          number: [''],
          neighborhood: [''],
          complement: [''],
          city: [''],
          state: [''],
          contry: [''],
          hemisphere: [''],
          xCoord: [''],
          yCoord: ['']
        }),
      }),
      destination: this.fb.group({
        zipCode: [''],
        street: [''],
        number: [''],
        neighborhood: [''],
        complement: [''],
        city: [''],
        state: [''],
        contry: [''],
        hemisphere: [''],
        xCoord: [''],
        yCoord: ['']
      })
    });
  }
  updateTypeAddress(type: string): void {
    this.selectedAddressType = type;
    this.travelForm.get('route')?.reset();
  }
}
