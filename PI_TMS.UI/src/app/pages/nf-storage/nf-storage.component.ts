import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-nf-storage',
  imports: [SidebarComponent, BrowserModule, PdfViewerModule],
  templateUrl: './nf-storage.component.html',
  styleUrl: './nf-storage.component.css'
})
export class NfStorageComponent {
  pdfSrc: any = null;

}
