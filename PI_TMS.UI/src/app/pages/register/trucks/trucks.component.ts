import { Component, OnInit, OnDestroy, signal, WritableSignal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruckService } from './Services/truck.service';
import { Truck } from './models/truck.model';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { EventService } from '../../../shared/service/event.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PlateFormatPipe } from '../../../utils/Formats/PlateFormat/plate-format.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AddTruckModalComponent } from "./utils/add-truck-modal/add-truck-modal.component";
import { UpdateTruckModalComponent } from "./utils/update-truck-modal/update-truck-modal.component";

declare var bootstrap: any;

@Component({
  selector: 'app-trucks',
  imports: [ CommonModule,FormsModule, PlateFormatPipe, NgbPaginationModule, NgxSkeletonLoaderModule, AddTruckModalComponent, UpdateTruckModalComponent],
  providers: [provideNgxMask()],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent implements OnInit, OnDestroy {

  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  trucks: Truck[] = [];
  
  
  trucksLoaded: WritableSignal<boolean> = signal<boolean>(false);


  constructor(private truckService: TruckService, private router: Router, private route: ActivatedRoute, private eventService: EventService,) {
    
  }

  ngOnInit(): void {
    this.getAllTrucks();
  }
  
  
  ngAfterViewInit(): void {
    // const addModalEl = document.getElementById('addTruckModal');
    // if (addModalEl) {
    //   this.addTruckModal = new bootstrap.Modal(addModalEl);
    // }
    // const editModalEl = document.getElementById('editTruckModal');
    // if (editModalEl) {
    //   this.editTruckModal = new bootstrap.Modal(editModalEl);
    // }
  }

  ngOnDestroy(): void {
    // this.addTruckModal?.dispose();
    // this.editTruckModal?.dispose();
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getAllTrucks() {
    this.truckService.getAllTrucks().subscribe({
      next: (response) => {
        console.log(response);
        this.trucks = response;
        this.trucksLoaded.set(true);
      },
      error: (error) => {
        this.eventService.showError('Erro inesperado.');
        this.trucksLoaded.set(true);
      }
    });
  }

  get filteredTrucks() {
    const term = this.searchTerm.toLowerCase();
    return this.trucks.filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.vehicleRegistrationPlate.registrationPlate.toLowerCase().includes(term)
    );
  }

  

  showAddModal(): void {
    // this.truckForm.reset();
    // this.truckForm.get('wheelType')?.disable();
    // this.truckForm.get('bodyType')?.disable();
    // this.addTruckModal?.show();
  }

  
  openEditModal(truck: Truck): void {
    // this.editingTruckId = truck.id;
    // this.truckForm.patchValue(truck);
    // this.editTruckModal?.show();
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