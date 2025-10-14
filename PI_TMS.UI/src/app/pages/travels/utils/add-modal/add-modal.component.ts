import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZipCodeData, ZipCodeService } from '../../service/zip-code/zip-code.service';
import { TravelService } from '../../service/travel.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { City, CityService } from '../../service/city/city.service';
import { Travel, Truck } from '../../model/travel.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { RoutesOptionsComponent } from "../routes-options/routes-options.component";
import { routes } from '../../../../app.routes';
import Modal from 'bootstrap/js/dist/modal';
import { EventService } from '../../../../shared/service/event.service';
import { TravelsComponent } from '../../travels.component';
import { PlateFormatPipe } from '../../../../utils/Formats/PlateFormat/plate-format.pipe';
declare var bootstrap: any;
@Component({
  selector: 'app-add-modal',
  imports: [
    PlateFormatPipe,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    CurrencyMaskModule,
    RoutesOptionsComponent
  ],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css'
})

export class AddModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  travelForm: FormGroup;
  currentStep: number = 1;

  trucks: Truck[] = [];
  filteredTrucks: Truck[] = [];
  filteredTrailers: Truck[] = [];

  weightvalue: number = 0;

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

  constructor(private fb: FormBuilder, private travelService: TravelService, private eventService: EventService, private travelComponent: TravelsComponent
  ) { this.travelForm = this.createForm(); }

  ngOnInit(): void {
    this.selectTruck();
  }

  onSubmit() {
    if (this.travelForm.invalid) {
      this.travelForm.markAllAsTouched();
      return;
    }
    if (this.travelForm.valid) {
      const travelData = this.travelForm.value;
      this.addTravel(travelData);
      this.travelForm.reset();
      this.currentStep = 1;
      const modalElement = document.getElementById('addTravelModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.hide();
      }
    }
  }
  addTravel($travelData: Travel) {
    this.travelService.addTravel($travelData).subscribe(
      (response) => {
        this.travelComponent.loadTravels();
      },
      (error) => {
        this.eventService.showError('Erro inesperado.')
      }
    );
  }
  createForm(): FormGroup {
    return this.fb.group({
      startDate: [''],
      endDate: [''],
      origin: this.fb.group({
        zipCode: [''],
        street: [''],
        number: [''],
        neighborhood: [''],
        complement: [''],
        city: [''],
        state: [''],
        country: [''],
        hemisphere: [''],
        xCoord: [''],
        yCoord: ['']
      }),
      destination: this.fb.group({
        zipCode: [''],
        street: [''],
        number: [''],
        neighborhood: [''],
        complement: [''],
        city: [''],
        state: [''],
        country: [''],
        hemisphere: [''],
        xCoord: [''],
        yCoord: ['']
      }),
      load: this.fb.group({
        product: [''],
        weight: [''],
        loadType: ['']
      }),
      vehiclePlate: [''],
      price: ['']
    });
  }


  selectTruck() {
    this.travelService.getAllTrucks().subscribe(
      (response) => {
        this.trucks = response;
        this.filterTrucksByType('Tração');
        this.filterTrailersByType('Reboque (Carreta)');
      }
    )
  }

  filterTrucksByType(type: string) {
    this.filteredTrucks = this.trucks.filter(
      (truck) => truck.truckType === type
    )
  }
  filterTrailersByType(type: string) {
    this.filteredTrailers = this.trucks.filter(
      (truck) => truck.truckType === type
    )
  }
  selectedTruck: any = null;

  onTruckChange() {
    const selectedPlate = this.travelForm.get('vehiclePlate')?.value;
    this.selectedTruck = this.trucks.find(
      (truck: any) => truck.vehicleRegistrationPlate.registrationPlate === selectedPlate
    );
  }

  setCursorEnd(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const valueLength = inputElement.value.length;
    setTimeout(() => {
      inputElement.setSelectionRange(valueLength, valueLength);
    }, 0);
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }
}