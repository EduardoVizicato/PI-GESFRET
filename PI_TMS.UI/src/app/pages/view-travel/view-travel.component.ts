import { Component } from '@angular/core';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { Travel } from './models/viewTravel.model';

@Component({
  selector: 'app-view-travel',
  imports: [PdfViewerModule],
  templateUrl: './view-travel.component.html',
  styleUrl: './view-travel.component.css'
})
export class ViewTravelComponent {
  pdfSrc: any;
  openPdf() {

  }
  cte: any = { name: 'name2', description: 'generic description 2', path: '/pdf/teste2.pdf' };
  viewTravel: Travel = {
    id: '1',
    date: '2023-10-01',
    route: {
      origin: 'City A',
      destination: 'City B'
    },
    vehiclePlate: 'ABC1234',
    product: 'Electronics',
    weight: '100kg',
    freightValue: 'R$ 500,00',
  };

}
