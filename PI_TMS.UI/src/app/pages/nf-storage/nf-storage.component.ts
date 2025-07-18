import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { nfStorage } from './model/nfStorage.model';


@Component({
  selector: 'app-nf-storage',
  imports: [SidebarComponent, CommonModule, PdfViewerModule],
  templateUrl: './nf-storage.component.html',
  styleUrl: './nf-storage.component.css'
})
export class NfStorageComponent {
  link: [string, string, string][] = [
    ['name1', 'generic description 1', '/pdf/teste1.pdf'],
    ['name2', 'generic description 2', '/pdf/teste2.pdf'],
    ['name3', 'generic description 3', '/pdf/teste3.pdf'],
    ['name4', 'generic description 4', '/pdf/teste4.pdf']
  ];
  nf: nfStorage[] = [];

  constructor() {
    this.nf = this.link.map((item) => ({ name: item[0], description: item[1], path: item[2] }));
  }



}
