import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { nfStorage } from './model/nfStorage.model';


@Component({
  selector: 'app-nf-storage',
  imports: [SidebarComponent, CommonModule,PdfViewerModule],
  templateUrl: './nf-storage.component.html',
  styleUrl: './nf-storage.component.css'
})
export class NfStorageComponent {
  link: [string][] = [
    [ '/pdf/teste1.pdf'],
    [ '/pdf/teste2.pdf'],
    [ '/pdf/teste3.pdf'],
    [ '/pdf/teste4.pdf']
  ];
  nf: nfStorage[] = [];

  constructor() {
    this.nf = this.link.map((item) => ({ path: item[0] }));
  }

  

}
