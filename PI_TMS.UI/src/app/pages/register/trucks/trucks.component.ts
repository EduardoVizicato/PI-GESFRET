import { Component, OnInit, signal, WritableSignal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruckService } from './Services/truck.service';
import { Truck } from './models/truck.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../shared/service/event.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AddTruckModalComponent } from "./utils/add-truck-modal/add-truck-modal.component";
import { UpdateTruckModalComponent } from "./utils/update-truck-modal/update-truck-modal.component";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PlateFormatPipe } from '../../../utils/Formats/PlateFormat/plate-format.pipe';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../token/token.service';
import Modal from 'bootstrap/js/dist/modal';
declare var bootstrap: any;

@Component({
  selector: 'app-trucks',
  imports: [CommonModule, FormsModule, PlateFormatPipe, NgbPaginationModule, NgxSkeletonLoaderModule, AddTruckModalComponent, UpdateTruckModalComponent],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent implements OnInit {

  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  trucks: Truck[] = [];
  selectedTruckId: string = '';

  trucksLoaded: WritableSignal<boolean> = signal<boolean>(false);
  showAddTruckModal: WritableSignal<boolean> = signal<boolean>(false);
  showUpdateTruckModal: WritableSignal<boolean> = signal<boolean>(false);


  constructor(
    private truckService: TruckService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getAllTrucks();
  }

  getAllTrucks() {
    this.trucksLoaded.set(false);
    const enterpriseId = this.tokenService.getEnterpriseId();

    if (!enterpriseId) {
      this.eventService.showError('ID da empresa não encontrado. Faça o login novamente.');
      this.trucksLoaded.set(true);
      return;
    }

    this.truckService.getAllTrucks(enterpriseId).subscribe({
      next: (response) => {
        this.trucks = response;
        this.trucksLoaded.set(true);
      },
      error: (error) => {
        this.eventService.showError('Erro ao carregar os caminhões.');
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

  openAddTruckModal(): void {
    this.showAddTruckModal.set(true);
  }

  openUpdateTruckModal(truckId: string) {
    this.selectedTruckId = truckId;
    this.showUpdateTruckModal.set(true);
  }

  onAddModalLoaded() {
    this.openModal('addTruckModal');
  }

  onUpdateModalLoaded() {
    this.openModal('editTruckModal');
  }

  openModal(name: string) {
    const modalElement = document.getElementById(name);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }

  closeModal(name: string) {
    const modalElement = document.getElementById(name);
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      if (name === 'addTruckModal') {
        this.showAddTruckModal.set(false);
      } else if (name === 'editTruckModal') {
        this.showUpdateTruckModal.set(false);
      }
    } else {
      console.warn('Elemento do modal não encontrado.');
    }
  }

  truckDelete(id: string): void {
    this.truckService.deleteTruck(id).subscribe({
      next: (response) => {
        this.trucks = this.trucks.filter(truck => truck.id !== id);
        
      },
      error: (err) => this.eventService.showError('Erro inesperado ao excluir caminhão.')
    });
  }

  onTruckAdded() {
    this.getAllTrucks();
  }

  setPage(page: number) {
    this.page = page;
  }
}