import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { nfStorage } from './model/nfStorage.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-nf-storage',
  imports: [CommonModule, PdfViewerModule, FormsModule, ReactiveFormsModule],
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
  searchTerm: string = '';
  nfForm: FormGroup;

  private addNfModal: any;

  constructor(private fb: FormBuilder) {
    this.nfForm = this.createForm();
    this.nf = this.link.map((item) => ({ name: item[0], description: item[1], path: item[2] }));
  }
  createForm(): FormGroup<any> {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      file: ['', [Validators.required]],
    })
  }
  ngAfterViewInit(): void {

    const addModalEl = document.getElementById('addNfModal');
    if (addModalEl) {
      this.addNfModal = new bootstrap.Modal(addModalEl);
    }

  }
  showAddModal(): void {
    // this.nfForm.reset();
    this.addNfModal?.show();
  }



  addNF() {
    if (this.nfForm.invalid) {
      this.nfForm.markAllAsTouched();
      return;
    }
    console.log(this.nfForm.value)
    // const nfData: NF = this.nfForm.value;
    // this.nfService.addTruck(nfData).subscribe({
    //   next: (response) => {
    //     this.getAllTrucks();
    //     // fecha aq
        this.addNfModal?.hide();
        this.nfForm.reset();
    //   },
    //   error: (err) => this.eventService.showError('Erro inesperado.')
    // })
  }
}
