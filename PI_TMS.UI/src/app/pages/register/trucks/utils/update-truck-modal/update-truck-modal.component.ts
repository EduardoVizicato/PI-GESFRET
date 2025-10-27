import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
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
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './update-truck-modal.component.html',
  styleUrl: './update-truck-modal.component.css'
})
export class UpdateTruckModalComponent {
  @Input() truckId!: string;
  trucks: Truck[] = [];
  truckData!: Truck;
  truckForm: FormGroup;

  trucksLoaded: WritableSignal<boolean> = signal<boolean>(false);
  private subscriptions: Subscription[] = [];


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

  constructor(private truckService: TruckService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private eventService: EventService, private trucksComponent: TrucksComponent) {
    this.truckForm = this.createEmptyForm();
  }

   ngOnInit(): void {
    this.truckForm = this.createEmptyForm();
    this.setupConditionalLogic();
    this.getTruckById();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getTruckById() {
    if (!this.truckId) {
      throw new Error('Truck ID is not set.');
    }

    this.truckService.getTruckById(this.truckId).subscribe(
      (response: any) => {
        this.truckData = response;
        this.truckForm.patchValue({
          name: this.truckData?.name || '',
          vehicleRegistrationPlate: {
            registrationPlate: this.truckData?.vehicleRegistrationPlate?.registrationPlate || ''
          },
          truckType: this.truckData?.truckType || '',
          wheelType: this.truckData?.wheelType || null,
          bodyType: this.truckData?.bodyType || null
        });

        this.evaluateConditionalLogic();
        console.log('Loaded truck data:', this.truckData);
      },
      (error: any) => {
        console.error('Error loading truck:', error);
      }
    );
  }

  private createEmptyForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      vehicleRegistrationPlate: this.fb.group({
        registrationPlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/i)]],
      }),
      truckType: ['', [Validators.required]],
      wheelType: [{ value: null, disabled: true }],
      bodyType: [{ value: null, disabled: true }]
    });
  }

  private setupConditionalLogic(): void {
    const truckTypeControl = this.truckForm.get('truckType') as FormControl;
    const wheelTypeControl = this.truckForm.get('wheelType') as FormControl;
    const bodyTypeControl = this.truckForm.get('bodyType') as FormControl;

    const truckTypeSub = truckTypeControl.valueChanges.subscribe(() => {
      this.evaluateConditionalLogic();
    });

    const wheelTypeSub = wheelTypeControl.valueChanges.subscribe(() => {
      if (truckTypeControl.value !== 'Tração') return;
      const wheelType = wheelTypeControl.value;
      if (wheelType === 'Cavalo (2-3 eixos e acopla carroceria)') {
        this.clearValidatorsAndDisable(bodyTypeControl, { resetValue: true });
      } else {
        this.setValidatorsAndEnable(bodyTypeControl, [Validators.required]);
      }
    });

    this.subscriptions.push(truckTypeSub, wheelTypeSub);
  }

  private evaluateConditionalLogic(): void {
    const truckTypeControl = this.truckForm.get('truckType') as FormControl;
    const wheelTypeControl = this.truckForm.get('wheelType') as FormControl;
    const bodyTypeControl = this.truckForm.get('bodyType') as FormControl;

    const type = truckTypeControl.value;

    if (type === 'Tração') {
      this.setValidatorsAndEnable(wheelTypeControl, [Validators.required]);

      const wheel = wheelTypeControl.value;
      if (wheel === 'Cavalo (2-3 eixos e acopla carroceria)') {
        this.clearValidatorsAndDisable(bodyTypeControl, { resetValue: true });
      } else {
        this.setValidatorsAndEnable(bodyTypeControl, [Validators.required]);
      }
    } else if (type === 'Reboque (Carreta)') {
      this.clearValidatorsAndDisable(wheelTypeControl, { resetValue: true });
      this.setValidatorsAndEnable(bodyTypeControl, [Validators.required]);
    } else {
      this.clearValidatorsAndDisable(wheelTypeControl, { resetValue: true });
      this.clearValidatorsAndDisable(bodyTypeControl, { resetValue: true });
    }
  }

  private setValidatorsAndEnable(control: FormControl, validators: any[]): void {
    control.setValidators(validators);
    control.enable({ emitEvent: false });
    control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  private clearValidatorsAndDisable(control: FormControl, options?: { resetValue?: boolean }): void {
    control.clearValidators();
    if (options?.resetValue) {
      control.reset(null, { emitEvent: false }); // zera sem emitir evento
    }
    control.disable({ emitEvent: false });
    control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  close(): void {
    this.truckForm.reset();
    this.trucksComponent.closeModal('editTruckModal');
  }
  
  onUpdate(): void {
    if (this.truckForm.invalid || !this.truckId) {
      this.truckForm.markAllAsTouched();
      return;
    }

    const updatedTruckData = this.truckForm.getRawValue();
    this.truckService.updateTruck(this.truckId, updatedTruckData).subscribe({
      next: () => {
        this.trucksComponent.getAllTrucks();
        this.truckForm.reset();
        this.trucksComponent.closeModal('editTruckModal');
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    });
  }


}
