import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadService } from './Services/load.service';
import { load } from './models/load.model';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';

//  const userId = this.authService.getUserId();
const userId = '5597035b-4a33-4921-8bce-08ddb05faf23';
@Component({
  selector: 'app-loads',
  imports: [SidebarComponent, HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './loads.component.html',
  styleUrl: './loads.component.css'
})

export class LoadsComponent implements OnInit {

  load: load[] = [];
  loadForm: FormGroup;
  editingLoadId: string | null = null;

  constructor(private loadService: LoadService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.loadForm = this.createForm();
  }

  ngOnInit(): void {
    this.getAllLoad()
  }

  getAllLoad() {
    this.loadService.getAllLoad().subscribe(
      (response) => {
        console.log(response);
        this.load = response;
      },
      (error) => {
        console.error('Error fetching loads:', error)
      }
    );
  }


  createForm(): FormGroup {
    return this.fb.group({
      description: this.fb.group({
        description: [''],
      }),
      quantity: [''],
      type: this.fb.group({
        type: [''],
      }),
      userId: [userId],
    })
  }

  addLoad() {
    const loadData: load = this.loadForm.value;
    this.loadService.addLoad(loadData).subscribe({
      next: (response) => {
        console.log(response)
        this.getAllLoad();

        const modalElement = document.getElementById('addLoadModal');
        if (modalElement) {
          const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
            // }else {
            //   se getInstance retornar null
            //   const bsModal = new (window as any).bootstrap.Modal(modalElement);
            //   bsModal.hide();
            // }
          }
        }
        this.loadForm.reset();
      },
      error: (err) => console.error('Erro:', err)
    })
  }

  openEditModal(load: load): void {
    this.editingLoadId = load.id;
    this.loadForm.patchValue(load);
  }

  onUpdate(): void {
    if (this.loadForm.invalid || !this.editingLoadId) return

    const updatedLoadData = this.loadForm.value;
    this.loadService.updateLoad(this.editingLoadId, updatedLoadData).subscribe({
      next: () => {
        this.getAllLoad();
        const modalElement = document.getElementById('editLoadModal');
        if (modalElement) {
          const modalInstance = (window as any).bootstrap.Modal(modalElement);
          if (modalInstance) {
            modalInstance.hide();
            // } else{
            //   // se getInstance retornar null
            //   const bsModal = new (window as any).bootstrap.Modal(modalElement);
            //   bsModal.hide();
            // }
          }
        }
        this.loadForm.reset();
        this.editingLoadId = null;
      },
      error: (err) => console.error('Erro ao autualizar carga:', err)
    });

  }

  loadDelete(id: string): void {
    this.loadService.deleteLoad(id).subscribe({
      next: (response) => {
        console.log('deletou');
        this.load = this.load.filter(load => load.id !== id);
      }
    })
  }


}
