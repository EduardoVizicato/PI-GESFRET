import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruckService } from './Services/truck.service';
import { Truck } from './models/truck.model';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PlateFormatPipe } from "./utils/plate-format.pipe";
import { EventService } from '../../../shared/service/event.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-trucks',
  imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule, NgxMaskDirective, PlateFormatPipe, NgbPaginationModule],
  providers: [provideNgxMask()],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent implements OnInit, OnDestroy {

  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  trucks: Truck[] = [];
  truckForm: FormGroup;
  editingTruckId: string | null = null;
  private subscriptions: Subscription[] = [];

  private addTruckModal: any;
  private editTruckModal: any;

  truckTypes: string[] = ['Tração', 'Reboque (Carreta)'];
  
  wheelTypes: string[] = [
    'Caminhão truck (3-4 eixos)',
    'Caminhão toco (2 eixos)',
    'Cavalo (2-3 eixos e acopla carroceria)',
    'VAN (2 eixos)',
    'Utilitários (2 eixos)',
    'Outros'
  ];

  bodyTypes: string[] = [
    'Não aplicável (Tanque, Caçamba, Boiadeira, etc)',
    'Aberta',
    'Fechada/Baú',
    'Granelera',
    'Porta Container',
    'Sider'
  ];

  constructor(private truckService: TruckService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private eventService: EventService,) {
    this.truckForm = this.createForm();
  }

  ngOnInit(): void {
    this.getAllTrucks();
    this.setupConditionalLogic();
  }
  
  private setupConditionalLogic(): void {
    const truckTypeControl = this.truckForm.get('truckType') as FormControl;
    const wheelTypeControl = this.truckForm.get('wheelType') as FormControl;
    const bodyTypeControl = this.truckForm.get('bodyType') as FormControl;

    const truckTypeSub = truckTypeControl.valueChanges.subscribe(type => {
      wheelTypeControl.reset();
      bodyTypeControl.reset();

      if (type === 'Tração') {
        this.setValidatorsAndEnable(wheelTypeControl, [Validators.required]);
        this.clearValidatorsAndDisable(bodyTypeControl);
      } else if (type === 'Reboque (Carreta)') {
        this.setValidatorsAndEnable(bodyTypeControl, [Validators.required]);
        this.clearValidatorsAndDisable(wheelTypeControl);
      } else {
        this.clearValidatorsAndDisable(wheelTypeControl);
        this.clearValidatorsAndDisable(bodyTypeControl);
      }
    });

    const wheelTypeSub = wheelTypeControl.valueChanges.subscribe(wheelType => {
        if (truckTypeControl.value !== 'Tração') return;

        if (wheelType === 'Cavalo (2-3 eixos e acopla carroceria)') {
            bodyTypeControl.reset();
            this.clearValidatorsAndDisable(bodyTypeControl);
        } else {
            this.setValidatorsAndEnable(bodyTypeControl, [Validators.required]);
        }
    });
    
    this.subscriptions.push(truckTypeSub, wheelTypeSub);
  }

  private setValidatorsAndEnable(control: FormControl, validators: any[]): void {
    control.setValidators(validators);
    control.enable();
    control.updateValueAndValidity();
  }
  
  private clearValidatorsAndDisable(control: FormControl): void {
    control.clearValidators();
    control.disable();
    control.updateValueAndValidity();
  }
  
  ngAfterViewInit(): void {
    const addModalEl = document.getElementById('addTruckModal');
    if (addModalEl) {
      this.addTruckModal = new bootstrap.Modal(addModalEl);
    }
    const editModalEl = document.getElementById('editTruckModal');
    if (editModalEl) {
      this.editTruckModal = new bootstrap.Modal(editModalEl);
    }
  }

  ngOnDestroy(): void {
    this.addTruckModal?.dispose();
    this.editTruckModal?.dispose();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getAllTrucks() {
    this.truckService.getAllTrucks().subscribe(
      (response) => {
        this.trucks = response;
      },
      (error) => {
        this.eventService.showError('Erro inesperado.')
      }
    );
  }

  get filteredTrucks() {
    const term = this.searchTerm.toLowerCase();
    return this.trucks.filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.vehicleRegistrationPlate.registrationPlate.toLowerCase().includes(term)
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      vehicleRegistrationPlate: this.fb.group({
        registrationPlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/i)]],
      }),
      truckType: [null, [Validators.required]],
      wheelType: [{ value: null, disabled: true }], 
      bodyType: [{ value: null, disabled: true }]
    });
  }

  showAddModal(): void {
    this.truckForm.reset();
    this.truckForm.get('wheelType')?.disable();
    this.truckForm.get('bodyType')?.disable();
    this.addTruckModal?.show();
  }

  addTruck() {
    if (this.truckForm.invalid) {
      this.truckForm.markAllAsTouched();
      return;
    }
    const truckData: Truck = this.truckForm.getRawValue();
    this.truckService.addTruck(truckData).subscribe({
      next: (response) => {
        this.getAllTrucks();
        this.addTruckModal?.hide();
        this.truckForm.reset();
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    });
  }

  openEditModal(truck: Truck): void {
    this.editingTruckId = truck.id;
    this.truckForm.patchValue(truck);
    this.editTruckModal?.show();
  }

  onUpdate(): void {
    if (this.truckForm.invalid || !this.editingTruckId) {
      this.truckForm.markAllAsTouched();
      return;
    }

    const updatedTruckData = this.truckForm.getRawValue();
    this.truckService.updateTruck(this.editingTruckId, updatedTruckData).subscribe({
      next: () => {
        this.getAllTrucks();
        this.editTruckModal?.hide();
        this.truckForm.reset();
        this.editingTruckId = null;
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    });
  }

  truckDelete(id: string): void {
    this.truckService.deleteTruck(id).subscribe({
      next: (response) => {
        this.trucks = this.trucks.filter(truck => truck.id !== id);
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    });
  }

  setPage(page: number) {
    this.page = page;
  }
}