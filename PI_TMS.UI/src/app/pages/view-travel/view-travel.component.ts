import { Component, Input, input, SimpleChanges } from '@angular/core';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { Travel } from './models/viewTravel.model';
import { EventService } from '../../shared/service/event.service';
import { ViewTravelService } from './service/view-travel.service';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { WeightFormatPipe } from "../../utils/Formats/WeightFormat/weight-format.pipe";

@Component({
  selector: 'app-view-travel',
  imports: [PdfViewerModule, DatePipe, CurrencyPipe, WeightFormatPipe, NgIf],
  templateUrl: './view-travel.component.html',
  styleUrl: './view-travel.component.css'
})
export class ViewTravelComponent {
  @Input() travelId!: string;
  viewTravel!: Travel;
  pdfSrc: any;
  openPdf() { }
  cte: any = { name: 'name2', description: 'generic description 2', path: '/pdf/teste2.pdf' };

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
      },
      (error) => {
        this.eventService.showError('Erro inesperado.')
      }
    );
  }

}
