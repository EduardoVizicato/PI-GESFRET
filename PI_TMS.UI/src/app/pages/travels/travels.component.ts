import { Component, input, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CityService } from './service/city/city.service';
import { TravelService } from './service/travel.service';
import { Travel } from './model/travel.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ZipCodeService, ZipCodeData } from './service/zip-code/zip-code.service';
import { AddModalComponent } from "./utils/add-modal/add-modal.component";
import { ViewTravelComponent } from "../view-travel/view-travel.component";
import { UpdateModalComponent } from "./utils/update-modal/update-modal.component";
import { EventService } from '../../shared/service/event.service';
import { WeightFormatPipe } from "../../utils/Formats/WeightFormat/weight-format.pipe";
import Modal from 'bootstrap/js/dist/modal';
declare var bootstrap: any;

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    AddModalComponent,
    ViewTravelComponent,
    UpdateModalComponent,
    WeightFormatPipe
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
  selectedTravelId: string = '';

  constructor(
    private http: HttpClient, private travelService: TravelService, private fb: FormBuilder, private eventService: EventService
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
  viewTravel(travelId: string) {
    this.selectedTravelId = travelId;
    this.openModal('viewTravelModal');
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