import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Importei Validators
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
  standalone: true,
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
    
    this.addTravel(this.travelForm.value);
  }

  addTravel(travelData: Travel) {
    this.travelService.addTravel(travelData).subscribe({
      next: (response) => {
        this.travelComponent.loadTravels();

        this.travelForm.reset();
        this.currentStep = 1;

        const modalElement = document.getElementById('addTravelModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      },
      error: (error) => {
        this.eventService.showError('Erro inesperado ao salvar a viagem.');
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      origin: this.fb.group({
        zipCode: [''],
        street: [''],
        number: [''],
        neighborhood: [''],
        complement: [''],
        city: [''],
        state: [{ value: '', disabled: true }],
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
        state: [{ value: '', disabled: true }],
        country: [''],
        hemisphere: [''],
        xCoord: [''],
        yCoord: ['']
      }),
      load: this.fb.group({
        product: ['', Validators.required],
        weight: ['', Validators.required],
        loadType: ['', Validators.required]
      }),
      vehiclePlate: ['', Validators.required],
      price: ['', Validators.required]
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