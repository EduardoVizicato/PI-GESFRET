import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Truck } from '../../models/truck.model';
import { Subscription } from 'rxjs';
import { TruckService } from '../../Services/truck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../../shared/service/event.service';

@Component({
  selector: 'app-add-truck-modal',
  imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './add-truck-modal.component.html',
  styleUrl: './add-truck-modal.component.css'
})
export class AddTruckModalComponent {

  trucks: Truck[] = [];
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

  constructor(private truckService: TruckService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private eventService: EventService,) {
    this.truckForm = this.createForm();
  }

  ngOnInit(): void {
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

  addTruck() {
    if (this.truckForm.invalid) {
      this.truckForm.markAllAsTouched();
      return;
    }
    const truckData: Truck = this.truckForm.getRawValue();
    this.truckService.addTruck(truckData).subscribe({
      next: (response) => {
        // this.getAllTrucks();
        // this.addTruckModal?.hide();
        this.truckForm.reset();
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    });
  }


}
