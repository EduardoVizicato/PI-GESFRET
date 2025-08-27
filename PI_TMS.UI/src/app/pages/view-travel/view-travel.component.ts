import { Component } from '@angular/core';
import { PdfViewerModule } from "ng2-pdf-viewer";

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
  
}
