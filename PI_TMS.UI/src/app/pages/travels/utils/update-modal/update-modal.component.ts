import { Component, Input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZipCodeData, ZipCodeService } from '../../service/zip-code/zip-code.service';
import { TravelService } from '../../service/travel.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { City, CityService } from '../../service/city/city.service';
import { Travel, Truck } from '../../model/travel.model';
import { PlateFormatPipe } from "../../../register/trucks/utils/plate-format.pipe";
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { RoutesOptionsComponent } from "../routes-options/routes-options.component";
import { routes } from '../../../../app.routes';
@Component({
  selector: 'app-update-modal',
  imports: [
    PlateFormatPipe,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    CurrencyMaskModule,
    RoutesOptionsComponent
  ],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent implements OnInit {
  travelForm: FormGroup;
  currentStep: number = 1;
  travelData!: Travel;
  trucks: Truck[] = [];

  weightvalue: number = 0;

  weightOptions = {
    prefix: '',
    thousands: '.',
    decimal: ',',
    precision: 3,
    allowNegative: false,
  };

  valueOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
  };

  constructor(private fb: FormBuilder, private travelService: TravelService,
  ) { this.travelForm = this.createForm(); }

  ngOnInit(): void {
    this.selectTruck();
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
  createForm(): FormGroup {
    return this.fb.group({
      date: [this.travelData?.startDate || ''],
      route: this.fb.group({
        origin: this.fb.group({
          zipCode: [this.travelData?.origin?.zipCode || ''],
          street: [this.travelData?.origin?.street || ''],
          number: [this.travelData?.origin?.number || ''],
          neighborhood: [this.travelData?.origin?.neighborhood || ''],
          complement: [this.travelData?.origin?.complement || ''],
          city: [this.travelData?.origin?.city || ''],
          state: [this.travelData?.origin?.state || ''],
          contry: [this.travelData?.origin?.country || ''],
          hemisphere: [this.travelData?.origin?.hemisphere || ''],
          xCoord: [this.travelData?.origin?.xCoord || ''],
          yCoord: [this.travelData?.origin?.yCoord || '']
        }),
        destination: this.fb.group({
          zipCode: [this.travelData?.destination?.zipCode || ''],
          street: [this.travelData?.destination?.street || ''],
          number: [this.travelData?.destination?.number || ''],
          neighborhood: [this.travelData?.destination?.neighborhood || ''],
          complement: [this.travelData?.destination?.complement || ''],
          city: [this.travelData?.destination?.city || ''],
          state: [this.travelData?.destination?.state || ''],
          contry: [this.travelData?.destination?.country || ''],
          hemisphere: [this.travelData?.destination?.hemisphere || ''],
          xCoord: [this.travelData?.destination?.xCoord || ''],
          yCoord: [this.travelData?.destination?.yCoord || '']
        }),
      }),
      vehiclePlate: [this.travelData?.vehiclePlate || ''],
      product: [this.travelData?.load.product || ''],
      weight: [this.travelData?.load.weight || ''],
      freightValue: [this.travelData?.price || '']
    });
  }


  selectTruck() {
    this.travelService.getAllTrucks().subscribe(
      (response) => {
        this.trucks = response;
      }
    )
  }

  setCursorEnd(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const valueLength = inputElement.value.length;
    setTimeout(() => {
      inputElement.setSelectionRange(valueLength, valueLength);
    }, 0);
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }
}