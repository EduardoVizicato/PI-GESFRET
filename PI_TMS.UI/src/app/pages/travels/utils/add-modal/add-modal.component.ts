import { Component, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZipCodeData, ZipCodeService } from '../../service/zip-code/zip-code.service';
import { TravelService } from '../../service/travel.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { City, CityService } from '../../service/city/city.service';
import { Truck } from '../../model/travel.model';
import { PlateFormatPipe } from "../../../register/trucks/utils/plate-format.pipe";
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { RoutesOptionsComponent } from "../routes-options/routes-options.component";
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-add-modal',
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
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css'
})
export class AddModalComponent {
  @Input() parentForm!: FormGroup;
  travelForm: FormGroup;
  currentStep: number = 1;
  
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

  
  
  onSubmit() {
  throw new Error('Method not implemented.');
  }
  createForm(): FormGroup {
    return this.fb.group({
      date: [''],
      // depois ver como vai funcionar a rota, pois ele tem que ser puxada do outro componente. (talvez fazer uma função que puxe os dados do outro componente)
      routes: this.parentForm,
      vehiclePlate: [''],
      product: [''],
      weight: [''],
      freightValue: ['']
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
