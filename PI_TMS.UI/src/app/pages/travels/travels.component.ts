import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxCurrencyDirective } from "ngx-currency";
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, sample, switchMap, tap } from 'rxjs/operators';
import { City, CityService } from './service/city.service';
import { TravelService } from './service/travel.service';
import { Truck } from './model/travel.model';
import { Travel } from './model/travel.model';

@Component({
  selector: 'app-traveltest',
  standalone: true,
  imports: [
    CommonModule,
    NgxCurrencyDirective,
    HttpClientModule
  ],
  providers: [
    CityService,
    TravelService
  ],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.css'
})
export class TravelsComponent implements OnInit {

  travels: Travel[] = [];
  
  weightvalue: number = 0;
  freightvalue: number = 0;
  trucks : Truck[] = [];

  citiesOrigin$!: Observable<City[]>;
  citiesDestination$!: Observable<City[]>;
  private searchOriginTerms = new Subject<string>();
  private searchDestinationTerms = new Subject<string>();

  showSuggestionsOrigin = false;
  showSuggestionsDestination = false;
  
  weightOptions = {
    prefix: '',
    thousands: '.',
    decimal: ',',
    precision: 3,
    allowNegative: false,
  };

  valueOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
  };

  constructor(private cityService: CityService, private travelService : TravelService) {}

  ngOnInit(): void {
    this.loadTravels();

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
  
  loadTravels(): void {
    
    // ver como que fica
    // const sampleTravels: Travel[] = [
    //   {
    //     id: 'a8b2c4d6-e8f0-1234-5678-9a1b3c5d7e9f',
    //     date: '31/07/2025',
    //     route: 'Jurupema/SP - Taquaritinga/SP',
    //     vehiclePlate: 'AAA-0000',
    //     product: 'TOMATE',
    //     weight: '14.570,000 Kg',
    //     freightValue: 'R$ 1.234,56'
    //   },
    // ]
    // this.travels = sampleTravels;

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

  selectTruck(){
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
      const input = document.getElementById('cidadeOrigem') as HTMLInputElement;
      input.value = cityName;
      this.showSuggestionsOrigin = false;
    } else {
      const input = document.getElementById('cidadeDestino') as HTMLInputElement;
      input.value = cityName;
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
}