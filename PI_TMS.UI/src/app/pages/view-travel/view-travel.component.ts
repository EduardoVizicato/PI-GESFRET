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
        zipCode: '15902-110',
        street: 'Rua Prof. Julia Volponi',
        number: '47',
        neighborhood: 'Jardim Pagliuso',
        complement: '',
        city: 'Taquaritinga',
        state: 'São Paulo',
        country: 'Brasil',
        hemisphere: 'Norte',
        xCoord: '21.400479080613188',
        yCoord: '48.49655599841981'
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
