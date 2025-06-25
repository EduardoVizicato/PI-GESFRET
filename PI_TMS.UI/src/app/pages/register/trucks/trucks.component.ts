import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruckService } from './Services/truck.service';
import { Truck } from './models/truck.model';
import { ActivatedRoute, Router, RouterModule,  } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PlateFormatPipe } from "./utils/plate-format.pipe";

interface VehicleTypeOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-trucks',
  imports: [SidebarComponent, HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule, NgxMaskDirective, PlateFormatPipe],
  providers: [provideNgxMask()],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent implements OnInit{

  trucks: Truck[] = [];
  /* `this.truckForm.patchValue(truck);` is a method call in the `TrucksComponent` class of an
  Angular application. This method is used to update the form controls in the `truckForm`
  FormGroup with the values from the `truck` object passed as an argument. */
  truckForm: FormGroup;
  editingTruckId: string | null = null; 

  availableVehicleTypes: VehicleTypeOption[] = [
    { id: 0, name: 'Carro' },
    { id: 1, name: 'Caminhão' },
    { id: 2, name: 'Carreta' },
  ];

  constructor(private truckService: TruckService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.truckForm = this.createForm();
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
        console.error('Error fetching trucks:', error);
      }
    );
  }

  createForm(): FormGroup{
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
      error: (err) => console.error('Erro:', err)
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
      error: (err) => console.error('Erro ao atualizar caminhão:', err)
    });
  }

  truckDelete(id: string): void {
    this.truckService.deleteTruck(id).subscribe({
      next: (response) => {
        console.log('deletou');
        this.trucks = this.trucks.filter(truck => truck.id !== id);
      }
    })
  }

}


