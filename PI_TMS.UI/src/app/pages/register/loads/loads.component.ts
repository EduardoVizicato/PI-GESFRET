                                                  import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadService } from './Services/load.service';
import { load } from './models/load.model';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { AuthTokenService } from '../../../_guard/service/auth-token.service';
import { EventService } from '../../../shared/service/event.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

//  const userId = this.authService.getUserId();
@Component({
  selector: 'app-loads',
  imports: [ HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule, NgbPaginationModule],
  templateUrl: './loads.component.html',
  styleUrl: './loads.component.css'
})

export class LoadsComponent implements OnInit {

  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  loads: load[] = [];
  loadForm: FormGroup;
  editingLoadId: string | null = null;

  constructor(private loadService: LoadService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authTokenService: AuthTokenService, private eventService: EventService,) {
    this.loadForm = this.createForm();
  }

  setPage(page: number) {
    this.page = page;
  }
  ngOnInit(): void {
    this.getAllLoad()
  }

  getAllLoad() {
    this.loadService.getAllLoad().subscribe(
      (response) => {
        console.log(response);
        this.loads = response;
      },
      (error) => {
        this.eventService.showError('Erro inesperado.')
      }
    );
  }
  get filteredLoads() {
    const term = this.searchTerm.toLowerCase();
    return this.loads.filter(u =>
      u.description.description.toLowerCase().includes(term) ||
      u.quantity.toString().includes(term) ||
      u.type.type.toLowerCase().includes(term)
    );
  }

  createForm(): FormGroup {
    const userId = this.authTokenService.getUserId();
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
          }
        }
        this.loadForm.reset();
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
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
          const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }
        }
        this.loadForm.reset();
        this.editingLoadId = null;
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    });

  }

  loadDelete(id: string): void {
    this.loadService.deleteLoad(id).subscribe({
      next: (response) => {
        console.log('deletou');
        this.loads = this.loads.filter(load => load.id !== id);
      },
      error: (err) => this.eventService.showError('Erro inesperado.')
    })
  }


}
