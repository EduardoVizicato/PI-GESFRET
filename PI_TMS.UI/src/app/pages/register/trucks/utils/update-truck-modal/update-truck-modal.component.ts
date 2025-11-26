import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Truck } from '../../models/truck.model';
import { Subscription } from 'rxjs';
import { TruckService } from '../../Services/truck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../../shared/service/event.service';
import { TrucksComponent } from '../../trucks.component';
// import { NgbAccordionItem } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-update-truck-modal',

  templateUrl: './update-truck-modal.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgxMaskDirective],  
  styleUrls: ['./update-truck-modal.component.css']
})
export class UpdateTruckModalComponent implements OnInit, AfterViewInit {

  @Input() truckId: string = '';
  @Output() loaded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() truckUpdated = new EventEmitter<void>();

  truckForm: FormGroup;
  truck: Truck | undefined;

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

  constructor(
    private fb: FormBuilder,
    private truckService: TruckService,
    private eventService: EventService
  ) {
    this.truckForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      vehicleRegistrationPlate: this.fb.group({
        registrationPlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/i)]]
      }),
      truckType: [null, [Validators.required]],
      wheelType: [{ value: null, disabled: true }],
      bodyType: [{ value: null, disabled: true }]
    });
  }

  ngOnInit(): void {
    if (this.truckId) {
      this.truckService.getTruckById(this.truckId).subscribe({
        next: (truck) => {
          this.truck = truck;
          this.truckForm.patchValue(truck);
          this.setupConditionalLogic();
        },
        error: (err) => this.eventService.showError('Erro ao carregar dados do caminhão.')
      });
    }
  }

  ngAfterViewInit(): void {
    this.loaded.emit();
  }

  setupConditionalLogic(): void {
    const truckTypeControl = this.truckForm.get('truckType');
    const wheelTypeControl = this.truckForm.get('wheelType');
    const bodyTypeControl = this.truckForm.get('bodyType');

    if (!truckTypeControl || !wheelTypeControl || !bodyTypeControl) return;

    truckTypeControl.valueChanges.subscribe(type => {
      if (type === 'Tração') {
        wheelTypeControl.setValidators([Validators.required]);
        wheelTypeControl.enable();
        bodyTypeControl.clearValidators();
        bodyTypeControl.disable();
      } else if (type === 'Reboque (Carreta)') {
        bodyTypeControl.setValidators([Validators.required]);
        bodyTypeControl.enable();
        wheelTypeControl.clearValidators();
        wheelTypeControl.disable();
      } else {
        wheelTypeControl.clearValidators();
        wheelTypeControl.disable();
        bodyTypeControl.clearValidators();
        bodyTypeControl.disable();
      }
      wheelTypeControl.updateValueAndValidity();
      bodyTypeControl.updateValueAndValidity();
    });

    truckTypeControl.updateValueAndValidity();
  }

  onUpdate(): void {
    if (this.truckForm.invalid) {
      this.truckForm.markAllAsTouched();
      return;
    }

    if (!this.truck) {
      this.eventService.showError('Dados do caminhão não encontrados.');
      return;
    }

    const updatedTruck: Truck = {
      ...this.truck,
      ...this.truckForm.getRawValue()
    };

    this.truckService.updateTruck(this.truckId, updatedTruck).subscribe({
      next: () => {

        this.truckUpdated.emit();
        this.close();
      },
      error: (err) => this.eventService.showError('Erro ao atualizar caminhão.')
    });
  }

  close(): void {
    this.closeModal.emit();
  }
}