// Importe AfterViewInit e OnDestroy para gerenciar o ciclo de vida do modal
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruckService } from './Services/truck.service';
import { Truck } from './models/truck.model';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PlateFormatPipe } from "./utils/plate-format.pipe";
import { EventService } from '../../../shared/service/event.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any;

interface VehicleTypeOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-trucks',
  imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule, NgxMaskDirective, PlateFormatPipe, NgbPaginationModule],
  providers: [provideNgxMask()],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})

export class TrucksComponent implements OnInit, AfterViewInit, OnDestroy {

  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  trucks: Truck[] = [];
  truckForm: FormGroup;
  editingTruckId: string | null = null;

  private addTruckModal: any;
  private editTruckModal: any;

  availableVehicleTypes: VehicleTypeOption[] = [
    { id: 0, name: 'Carro' },
    { id: 1, name: 'Caminhão' },
    { id: 2, name: 'Carreta' },
  ];

  constructor(private truckService: TruckService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private eventService: EventService,) {
    this.truckForm = this.createForm();
  }

  ngOnInit(): void {
    this.getAllTrucks();
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
      vehicleType: [null as number | null],
      vehicleRegistrationPlate: this.fb.group({
        registrationPlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/i)
        ]],
      })
    })
  }
  
  showAddModal(): void {
    this.truckForm.reset();
    this.addTruckModal?.show();
  }

  addTruck() {
    if (this.truckForm.invalid) {
      this.truckForm.markAllAsTouched();
      return;
    }
    const truckData: Truck = this.truckForm.value;
    this.truckService.addTruck(truckData).subscribe({
      next: (response) => {
        this.getAllTrucks();
        // fecha aq
        this.addTruckModal?.hide();
        this.truckForm.reset();
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    })
  }
  
  openEditModal(truck: Truck): void {
    this.editingTruckId = truck.id;
    this.truckForm.patchValue(truck);
    // mostra aq
    this.editTruckModal?.show();
  }

  onUpdate(): void {
    if (this.truckForm.invalid || !this.editingTruckId) {
      this.truckForm.markAllAsTouched();
      return;
    }

    const updatedTruckData = this.truckForm.value;
    this.truckService.updateTruck(this.editingTruckId, updatedTruckData).subscribe({
      next: () => {
        this.getAllTrucks();
        // fecha aq
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
    })
  }

  setPage(page: number) {
    this.page = page;
  }
}