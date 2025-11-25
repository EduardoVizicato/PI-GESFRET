import { ChangeDetectorRef, Component, input, OnInit, ViewChild, signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CityService } from './service/city/city.service';
import { TravelService } from './service/travel.service';
import { Travel, Truck } from './model/travel.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ZipCodeService, ZipCodeData } from './service/zip-code/zip-code.service';
import { AddModalComponent } from "./utils/add-modal/add-modal.component";
import { ViewTravelComponent } from "../view-travel/view-travel.component";
import { UpdateModalComponent } from "./utils/update-modal/update-modal.component";
import { EventService } from '../../shared/service/event.service';
import { WeightFormatPipe } from "../../utils/Formats/WeightFormat/weight-format.pipe";
// 1. Importação do NgxSkeletonLoaderModule
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
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
    // UpdateModalComponent,
    WeightFormatPipe,
    UpdateModalComponent,
    NgxSkeletonLoaderModule
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
  trucks: Truck[] = [];
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  sortedFilteredTravel: Travel[] = [];
  pagedTravels: Travel[] = [];
  freightvalue: number = 0;
  showAddTravelModal = false;
  showUpdateTravelModal = false;
  selectedTravelId: string = '';
  travelsLoaded: WritableSignal<boolean> = signal<boolean>(false);
  activeFilter: boolean | undefined = undefined;

  constructor(
    private http: HttpClient,
    private travelService: TravelService,
    private fb: FormBuilder,
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadTravels();
  }

  viewTravel(travelId: string) {
    this.selectedTravelId = travelId;
    this.cdr.detectChanges();
    this.openModal('viewTravelModal');
  }

  openAddTravelModal() {
    this.showAddTravelModal = true;
    this.cdr.detectChanges();
    this.openModal('addTravelModal');
  }
  openUpdateTravelModal(travelId: string) {
    this.showUpdateTravelModal = true;
    this.selectedTravelId = travelId;
    this.cdr.detectChanges();
    this.openModal('updateTravelModal');
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

  closeModal() {
    this.showAddTravelModal = false;
  }

  onFilterChange(filterValue: boolean | undefined): void {
    this.activeFilter = filterValue;
    this.loadTravels();
  }

  loadTravels(): void {
    this.travelService.getAllTravel(this.activeFilter).subscribe(
      (response) => {
        this.travels = response || [];
        this.applyFiltersAndSort();
        this.travelsLoaded.set(true);

        },
        (error) => {
          this.eventService.showError('Erro inesperado.');
          this.travelsLoaded.set(true);
        }
    );
  }
  

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.page = 1;
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort() {
    const listToSort = this.filteredTravel.slice();
    this.sortedFilteredTravel = listToSort.sort((a, b) => {
      const da = Date.parse(String(a?.startDate)) || 0;
      const db = Date.parse(String(b?.startDate)) || 0;
      return db - da;
    });

    this.updatePagedTravels();
  }

  updatePagedTravels() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedTravels = this.sortedFilteredTravel.slice(start, end);
  }

  trackByTravel(index: number, travel: Travel) {
    return travel.id;
  }

  get filteredTravel() {
    const term = (this.searchTerm || '').toLowerCase().trim();
    if (!term) {
      return this.travels;
    }

    return this.travels.filter(u => {
      const originCity = (u?.origin?.city || '').toString().toLowerCase();
      const destCity = (u?.destination?.city || '').toString().toLowerCase();
      const product = (u?.load?.product || '').toString().toLowerCase();
      const weight = String(u?.load?.weight ?? '').toLowerCase();
      const price = String(u?.price ?? '').toLowerCase();

      return originCity.includes(term) ||
        destCity.includes(term) ||
        product.includes(term) ||
        weight.includes(term) ||
        price.includes(term);
    });
  }

  onPageChanged(newPage: number) {
    this.page = newPage;
    this.updatePagedTravels();
  }

  updateTravel(travel: Travel) {
  }

  deleteTravel(id: string) {
    this.travelService.deleteTravel(id).subscribe(
      () => {
        this.loadTravels();
      },
      (error) => {
        this.eventService.showError('Erro ao deletar viagem.');
      }
    );
  }
}