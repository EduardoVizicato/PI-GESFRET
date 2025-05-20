import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruckService } from './Services/truck.service';
import { Truck } from './models/truck.model';
import { ActivatedRoute, Router, RouterModule,  } from '@angular/router';

interface VehicleTypeOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-trucks',
  imports: [SidebarComponent,HttpClientModule,FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent implements OnInit{

  trucks: Truck[] = [];
  truckForm: FormGroup;

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
        console.log('oi')
        this.getAllTrucks();

        const modalElement = document.getElementById('staticBackdrop');
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
    
      }
    })
  }

}


