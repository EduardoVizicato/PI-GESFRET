import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxCurrencyDirective } from "ngx-currency";
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { City, CityService } from './service/city/city.service';
import { TravelService } from './service/travel.service';
import { Truck } from './model/travel.model';
import { Travel } from './model/travel.model';
import { PlateFormatPipe } from "../register/trucks/utils/plate-format.pipe";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ZipCodeService, ZipCodeData } from './service/zip-code/zip-code.service';
import { AddModalComponent } from "./utils/add-modal/add-modal.component";
import { ViewTravelComponent } from "../view-travel/view-travel.component";
import { UpdateModalComponent } from "./utils/update-modal/update-modal.component";
import { EventService } from '../../shared/service/event.service';
import Modal from 'bootstrap/js/dist/modal';
declare var bootstrap: any;

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    AddModalComponent,
    ViewTravelComponent,
    UpdateModalComponent
  ],
  providers: [
    CityService,
    TravelService,
    ZipCodeService
  ],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.css'
})
export class TravelsComponent implements OnInit {

  travels: Travel[] = [];
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;

  freightvalue: number = 0;

  private addTravelModal: any;
  viewTravel: any;

  constructor(
    private http: HttpClient , private travelService: TravelService, private fb: FormBuilder, private eventService: EventService, private zipCodeService: ZipCodeService, private cityService: CityService
  ) { }
  ngOnInit(): void {
    this.loadTravels();
  }

  ngAfterViewInit(): void {
    const addModalEl = document.getElementById('freteModal');
    if (addModalEl) {
      this.addTravelModal = new bootstrap.Modal(addModalEl);
    }
  }
  openModal(name: string) {
    const modalElement = document.getElementById(name);

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }
  
 
  loadTravels(): void {
     this.travelService.getAllTravel().subscribe(
      (response) => {
        this.travels = response;
      },
      (error) => {
        this.eventService.showError('Erro inesperado.')
      }
    );
  }

  get filteredTravel() {
    const term = this.searchTerm.toLowerCase();
    return this.travels.filter(u =>
      u.origin.city.toLowerCase().includes(term) ||
      u.destination.city.toLowerCase().includes(term) ||
      u.vehiclePlate.toLowerCase().includes(term) ||
      u.load.product.toLowerCase().includes(term) ||
      u.load.weight.toLowerCase().includes(term) ||
      u.price.toLowerCase().includes(term)
    );
  }

  cloneTravel(travel: Travel) {
    const newTravel: Travel = structuredClone(travel);
    // const newTravel = JSON.parse(JSON.stringify(travel));

    newTravel.id = crypto.randomUUID();
    newTravel.startDate = new Date().toLocaleDateString('pt-BR');

    this.travels.push(newTravel);
  }

  updateTravel(travel: Travel) {

  }
  deleteTravel(travel: Travel) {
    const index = this.travels.findIndex(t => t.id === travel.id);
    if (index !== -1) {
      this.travels.splice(index, 1);
    }
  }
}