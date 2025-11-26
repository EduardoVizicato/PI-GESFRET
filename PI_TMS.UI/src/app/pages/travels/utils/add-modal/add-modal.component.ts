import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from "ng2-currency-mask";
import Modal from 'bootstrap/js/dist/modal';
import { TravelService } from '../../service/travel.service';
import { EventService } from '../../../../shared/service/event.service';
import { TokenService } from '../../../../token/token.service';
import { TravelsComponent } from '../../travels.component';
import { RoutesOptionsComponent } from "../routes-options/routes-options.component";
import { PlateFormatPipe } from '../../../../utils/Formats/PlateFormat/plate-format.pipe';
import { Truck } from '../../model/travel.model';


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
  selectedTruck: any = null;

  weightOptions = { prefix: '', thousands: '.', decimal: ',', precision: 3, allowNegative: false };
  valueOptions = { prefix: 'R$ ', thousands: '.', decimal: ',', precision: 2, allowNegative: false };

  constructor(
    private fb: FormBuilder, 
    private travelService: TravelService, 
    private eventService: EventService, 
    private travelComponent: TravelsComponent,
    private tokenService: TokenService
  ) { 
    this.travelForm = this.createForm(); 
  }

  ngOnInit(): void {
    this.selectTruck();
  }

  onSubmit() {
    if (this.travelForm.invalid) {
      this.travelForm.markAllAsTouched();
      this.eventService.showError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    this.addTravel(this.travelForm.getRawValue());
  }

  addTravel(travelData: any) {
    const enterpriseId = this.tokenService.getEnterpriseId();
    if (!enterpriseId) {
      this.eventService.showError('ID da empresa não encontrado. Faça o login novamente.');
      return;
    }

    const formData = new FormData();
    
    formData.append('startDate', travelData.startDate);
    formData.append('endDate', travelData.endDate);
    formData.append('truckId', travelData.truckId);
    formData.append('price', travelData.price.toString());
    formData.append('enterpriseId', enterpriseId);

    Object.keys(travelData.origin).forEach(key => formData.append(`origin.${key}`, travelData.origin[key]));
    Object.keys(travelData.destination).forEach(key => formData.append(`destination.${key}`, travelData.destination[key]));
    Object.keys(travelData.load).forEach(key => formData.append(`load.${key}`, travelData.load[key]));
    
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    
    this.travelService.addTravel(formData).subscribe({
      next: (response) => {

        this.travelComponent.loadTravels();
        
        this.travelForm.reset();
        this.selectedFile = null;
        this.currentStep = 1;
        const modalElement = document.getElementById('addTravelModal');
        const modal = Modal.getInstance(modalElement!);
        if (modal) modal.hide();
      },
      error: (error) => {
        console.error('❌ Erro ao salvar viagem:', error);
        this.eventService.showError('Erro inesperado ao salvar a viagem.');
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      origin: this.fb.group({
        zipCode: [''], street: [''], number: [''], neighborhood: [''],
        complement: [''], city: [''], state: [{ value: '', disabled: true }],
        country: [''], hemisphere: [''], xCoord: [''], yCoord: ['']
      }),
      destination: this.fb.group({
        zipCode: [''], street: [''], number: [''], neighborhood: [''],
        complement: [''], city: [''], state: [{ value: '', disabled: true }],
        country: [''], hemisphere: [''], xCoord: [''], yCoord: ['']
      }),
      load: this.fb.group({
        product: ['', Validators.required],
        weight: ['', Validators.required],
        loadType: ['', Validators.required]
      }),
      truckId: ['', Validators.required],
      price: ['', Validators.required],
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
    this.filteredTrucks = this.trucks.filter((truck) => truck.truckType === type);
  }

  filterTrailersByType(type: string) {
    this.filteredTrailers = this.trucks.filter((truck) => truck.truckType === type);
  }

  onTruckChange() {
    const selectedPlate = this.travelForm.get('vehiclePlate')?.value;
    this.selectedTruck = this.trucks.find((truck: any) => truck.vehicleRegistrationPlate.registrationPlate === selectedPlate);
  }

  setCursorEnd(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const valueLength = inputElement.value.length;
    setTimeout(() => { inputElement.setSelectionRange(valueLength, valueLength); }, 0);
  }

  nextStep() { this.currentStep++; }
  previousStep() { this.currentStep--; }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}