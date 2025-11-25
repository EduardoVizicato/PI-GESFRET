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
  selectedFile: File | null = null;

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
    const formData = new FormData();
    
    // Append simple fields
    formData.append('startDate', travelData.startDate);
    formData.append('endDate', travelData.endDate);
    formData.append('truckId', travelData.truckId);
    formData.append('price', travelData.price.toString());
    formData.append('enterpriseId', travelData.enterpriseId);
    
    // Append nested objects as JSON strings
    formData.append('origin', JSON.stringify(travelData.origin));
    formData.append('destination', JSON.stringify(travelData.destination));
    formData.append('load', JSON.stringify(travelData.load));
    
    // Append the ACTUAL file object, not the form control value!
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log('✅ File added to FormData:', this.selectedFile.name);
    } else {
      console.warn('⚠️ No file selected!');
    }
    
    // Log FormData contents for debugging
    console.log('📦 FormData contents:');
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`  ${key}: [File] ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`  ${key}:`, value);
      }
    });
    
    this.travelService.addTravel(formData).subscribe({
      next: (response) => {
        this.travelComponent.loadTravels();
        this.travelForm.reset();
        this.selectedFile = null; // Clear selected file
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
        console.error('❌ Error saving travel:', error);
        this.eventService.showError('Erro inesperado ao salvar a viagem.');
      }
    });
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
        product: [''],
        weight: [''],
        loadType: ['']
      }),
      truckId: [''],
      price: [''],
      enterpriseId: ['21c65e9b-f103-473c-82cc-5bf3298e5133'],
      file: [null]
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
    this.selectedFile = file;
      console.log('📎 File selected:', file.name, file.size, 'bytes');
    }
  }
}