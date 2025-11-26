import { Component, Input, input, SimpleChanges } from '@angular/core';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { Travel, Truck } from './models/viewTravel.model';
import { EventService } from '../../shared/service/event.service';
import { ViewTravelService } from './service/view-travel.service';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { WeightFormatPipe } from "../../utils/Formats/WeightFormat/weight-format.pipe";
import { PlateFormatPipe } from "../../utils/Formats/PlateFormat/plate-format.pipe";

@Component({
  selector: 'app-view-travel',
  imports: [PdfViewerModule, DatePipe, CurrencyPipe, WeightFormatPipe, NgIf, PlateFormatPipe],
  templateUrl: './view-travel.component.html',
  styleUrl: './view-travel.component.css'
})
export class ViewTravelComponent {
  @Input() travelId!: string;
  viewTravel?: Travel;
  truck?: Truck;
  pdfSrc: any;
  openPdf() { }

  constructor(private viewTravelService: ViewTravelService, private eventService: EventService) { }
  ngOnInit() {
    if (this.travelId) {
      this.getTravel();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['travelId'] && changes['travelId'].currentValue) {
      this.getTravel();
      
    }
  }
  getTravel() {
    this.viewTravelService.getTravelById(this.travelId).subscribe(
      (response) => {
        this.viewTravel = response;
        this.getTruck();  
      },
      (error) => {
        this.eventService.showError('Erro inesperado.')
      }
    );
  }
  getTruck() {
    if (this.viewTravel?.truckId) {
      this.viewTravelService.getTruckById(this.viewTravel.truckId).subscribe(
        (response) => {
          this.truck = response;
        },
        (error) => {
          this.eventService.showError('Erro ao carregar caminhão.');
        }
      );
    }
  }

}