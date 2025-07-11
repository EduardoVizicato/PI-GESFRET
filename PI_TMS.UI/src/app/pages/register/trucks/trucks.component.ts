import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruckService } from './Services/truck.service';
import { Truck } from './models/truck.model';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PlateFormatPipe } from "./utils/plate-format.pipe";
import { EventService } from '../../../shared/service/event.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

interface VehicleTypeOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-trucks',
  imports: [SidebarComponent, HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule, NgxMaskDirective, PlateFormatPipe, NgbPaginationModule],
  providers: [provideNgxMask()],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  trucks: Truck[] = [];
  truckForm: FormGroup;
  editingTruckId: string | null = null;

  availableVehicleTypes: VehicleTypeOption[] = [
    { id: 0, name: 'Carro' },
    { id: 1, name: 'Caminhão' },
    { id: 2, name: 'Carreta' },
  ];

  constructor(private truckService: TruckService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private eventService: EventService,) {
    this.truckForm = this.createForm();
  }

  setPage(page: number) {
    this.page = page;
  }
  ngOnInit(): void {
    this.getAllTrucks();
  }

  getAllTrucks() {
    this.truckService.getAllTrucks().subscribe(
      (response) => {
        console.log(response);
        this.trucks = response;
      },
      (error) => {
        this.eventService.showError('Erro inesperado.')
      }
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [''],
      vehicleType: [null as number | null],
      vehicleRegistrationPlate: this.fb.group({
        registrationPlate: [''],
      })
    })
  }

  addTruck() {
    const truckData: Truck = this.truckForm.value;
    this.truckService.addTruck(truckData).subscribe({
      next: (response) => {
        console.log(response)
        this.getAllTrucks();

        const modalElement = document.getElementById('addTruckModal');
        if (modalElement) {
          const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          } //else {
          //   se getInstance retornar null
          //   const bsModal = new (window as any).bootstrap.Modal(modalElement);
          //   bsModal.hide();
          // }
        }
        this.truckForm.reset();

      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    })
  }

  openEditModal(truck: Truck): void {
    this.editingTruckId = truck.id;
    this.truckForm.patchValue(truck);
  }

  onUpdate(): void {
    if (this.truckForm.invalid || !this.editingTruckId) return;

    const updatedTruckData = this.truckForm.value;
    this.truckService.updateTruck(this.editingTruckId, updatedTruckData).subscribe({
      next: () => {
        this.getAllTrucks();
        const modalElement = document.getElementById('editTruckModal');
        if (modalElement) {
          const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          } //else {
          //   se getInstance retornar null
          //   const bsModal = new (window as any).bootstrap.Modal(modalElement);
          //   bsModal.hide();
          // }
        }
        this.truckForm.reset();
        this.editingTruckId = null;
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    });
  }

  truckDelete(id: string): void {
    this.truckService.deleteTruck(id).subscribe({
      next: (response) => {
        console.log('deletou');
        this.trucks = this.trucks.filter(truck => truck.id !== id);
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    })
  }

}


