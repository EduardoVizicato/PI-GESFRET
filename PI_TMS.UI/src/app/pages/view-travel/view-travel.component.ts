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
      origin: {
        zipCode: '12345-678',
        street: 'Street A',
        number: '123',
        neighborhood: 'Neighborhood A',
        complement: 'Apt 1',
        city: 'City A',
        state: 'State A',
        country: 'Country A',
        hemisphere: 'Northern',
        xCoord: '123.456',
        yCoord: '78.910'
      },
      destination: {
        zipCode: '98765-432',
        street: 'Street B',
        number: '456',
        neighborhood: 'Neighborhood B',
        complement: 'Apt 2',
        city: 'City B',
        state: 'State B',
        country: 'Country B',
        hemisphere: 'Southern',
        xCoord: '654.321',
        yCoord: '21.098'
      }
    },
    vehiclePlate: 'ABC1234',
    product: 'Electronics',
    weight: '100kg',
    freightValue: 'R$ 500,00',
  };

}
