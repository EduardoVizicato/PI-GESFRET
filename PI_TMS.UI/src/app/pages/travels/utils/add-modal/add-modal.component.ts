import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ZipCodeData, ZipCodeService } from '../../service/zip-code/zip-code.service';
import { TravelService } from '../../service/travel.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { City, CityService } from '../../service/city/city.service';
import { Truck } from '../../model/travel.model';

@Component({
  selector: 'app-add-modal',
  imports: [],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css'
})
export class AddModalComponent {
  travelForm: FormGroup;
  
  currentStep: number = 1;
  selectedAddressType: any = 'simple';
  trucks: Truck[] = [];

  citiesOrigin$!: Observable<City[]>;
  citiesDestination$!: Observable<City[]>;
  private searchOriginTerms = new Subject<string>();
  private searchDestinationTerms = new Subject<string>();


  showSuggestionsOrigin = false;
  showSuggestionsDestination = false;

  constructor(private fb: FormBuilder, private travelService: TravelService,
    private zipCodeService: ZipCodeService,private cityService: CityService) { this.travelForm = this.createForm(); }

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

  createForm(): FormGroup {
    return this.fb.group({
      date: [''],
      route: this.fb.group({
        origin: this.fb.group({
          destination: [''],
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
      }),
      vehiclePlate: [''],
      product: [''],
      weight: [''],
      freightValue: ['']
    });
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

  selectTruck() {
    this.travelService.getAllTrucks().subscribe(
      (response) => {
        this.trucks = response;
      }
    )
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

  setCursorEnd(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const valueLength = inputElement.value.length;
    setTimeout(() => {
      inputElement.setSelectionRange(valueLength, valueLength);
    }, 0);
  }

  updateTypeAddress(type: string): void {
    this.selectedAddressType = type;
    this.travelForm.get('route')?.reset();
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

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }
}
