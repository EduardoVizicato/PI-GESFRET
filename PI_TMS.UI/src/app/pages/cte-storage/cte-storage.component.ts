import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { cteStorage } from './models/cteStorage.model';
declare var bootstrap: any;

@Component({
  selector: 'app-cte-storage',
  imports: [CommonModule, PdfViewerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cte-storage.component.html',
  styleUrl: './cte-storage.component.css'
})
export class CteStorageComponent {

  link: [string, string, string][] = [
    ['name1', 'generic description 1', '/pdf/teste1.pdf'],
    ['name2', 'generic description 2', '/pdf/teste2.pdf'],
    ['name3', 'generic description 3', '/pdf/teste3.pdf'],
    ['name4', 'generic description 4', '/pdf/teste4.pdf']
  ];
  cte: cteStorage[] = [];
  searchTerm: string = '';
  cteForm: FormGroup;
  pdfSrc: any = null;

  private addCteModal: any;

  constructor(private fb: FormBuilder) {
    this.cteForm = this.createForm();
    this.cte = this.link.map((item) => ({ name: item[0], description: item[1], path: item[2] }));
  }
  createForm(): FormGroup<any> {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      file: ['', [Validators.required]],
    })
  }
  ngAfterViewInit(): void {

    const addModalEl = document.getElementById('addCteModal');
    if (addModalEl) {
      this.addCteModal = new bootstrap.Modal(addModalEl);
    }

  }
  showAddModal(): void {
    // this.cteForm.reset();
    this.addCteModal?.show();
  }



  addCte() {
    if (this.cteForm.invalid) {
      this.cteForm.markAllAsTouched();
      return;
    }
    console.log(this.cteForm.value)
    // const cteData: Cte = this.cteForm.value;
    // this.cteService.addTruck(cteData).subscribe({
    //   next: (response) => {
    //     this.getAllTrucks();
    //     // fecha aq
    this.addCteModal?.hide();
    this.cteForm.reset();
    //   },
    //   error: (err) => this.eventService.showError('Erro inesperado.')
    // })
  }

  openViewDocModal(cte: cteStorage) {
    const modalTitle = document.querySelector('#viewDocModal .modal-title');
    if (modalTitle) {
      modalTitle.textContent = cte.name;
    }
    this.pdfSrc = cte.path;

  }
}
