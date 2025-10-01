import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import Modal from 'bootstrap/js/dist/modal';
import { ViewTravelComponent } from "../view-travel/view-travel.component";
import { UpdateModalComponent } from "./utils/update-modal/update-modal.component";
declare var bootstrap: any;

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [
    CommonModule,
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
    private http: HttpClient
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
  openModalAdd() {
    const modalElement = document.getElementById('addTravelModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }
  openModalUpdate() {
    const modalElement = document.getElementById('updateTravelModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }
  openModalView() {
    const modalElement = document.getElementById('viewTravelModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }
  addTravel($event: Event) {
    throw new Error('Method not implemented.');
  }

  loadTravels(): void {
    const sampleTravels: Travel[] = [
      {
        id: 'a8b2c4d6-e8f0-1234-5678-9a1b3c5d7e9f',
        date: '31/07/2025',
        route: ({
          origin: {
            zipCode: '',
            street: '',
            number: '',
            neighborhood: '',
            complement: '',
            city: 'Jurupema',
            state: 'SP',
            contry: 'BR',
            hemisphere: 'S',
            xCoord: '',
            yCoord: ''
          },
          destination: {
            zipCode: '',
            street: '',
            number: '',
            neighborhood: '',
            complement: '',
            city: 'Taquaritinga',
            state: 'SP',
            contry: 'BR',
            hemisphere: 'S',
            xCoord: '',
            yCoord: ''
          },
        }),
        vehiclePlate: 'AAA-0000',
        product: 'TOMATE',
        weight: '14.570,000 Kg',
        freightValue: 'R$ 1.234,56'
      },
    ]
    this.travels = sampleTravels;
  }

  get filteredTravel() {
    const term = this.searchTerm.toLowerCase();
    return this.travels.filter(u =>
      u.route.origin.city.toLowerCase().includes(term) ||
      u.route.destination.city.toLowerCase().includes(term) ||
      u.vehiclePlate.toLowerCase().includes(term) ||
      u.product.toLowerCase().includes(term) ||
      u.weight.toLowerCase().includes(term) ||
      u.freightValue.toLowerCase().includes(term)
    );
  }

  cloneTravel(travel: Travel) {
    const newTravel: Travel = structuredClone(travel);
    // const newTravel = JSON.parse(JSON.stringify(travel));

    newTravel.id = crypto.randomUUID();
    newTravel.date = new Date().toLocaleDateString('pt-BR');

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