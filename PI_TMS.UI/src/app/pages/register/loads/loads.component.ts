import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadService } from './Services/load.service';
import { load } from './models/load.model';
import { ActivatedRoute, Router, RouterModule,  } from '@angular/router';

@Component({
  selector: 'app-loads',
  imports: [SidebarComponent, HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './loads.component.html',
  styleUrl: './loads.component.css'
})

export class LoadsComponent implements OnInit {

  load: load[] = [];
  //loadForm: FormGroup;

  constructor(private loadServive: LoadService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute){
    //this.loadForm = this.createForm();
  }

  ngOnInit(): void {
    this.getAllLoad()
  }

  getAllLoad(){
    this.loadServive.getAllLoad().subscribe(
      (response) => {
        console.log(response);
        this.load = response;
      },
      (error) => {
        console.error('Error fetching loads:', error)
      }
    );
  }

  // createForm(): FormGroup{
  //   return this.fb.group({
  //    Description: [''],
  //    Quantity: [null as number | null],
  //    type: ['']
  //   })
  // }

  // addLoad() {
  //   const loadData: load = this.loadForm.value;
  //   this.loadServive.addLoad(loadData).subscribe({
  //     next: (response) => {
  //       console.log('oi')
  //       this.getAllLoad();

  //       const modalElement = document.getElementById('staticBackdrop');
  //       if(modalElement) {
  //         const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
  //         if(modalInstance) {
  //           modalInstance.hide();
  //         // }else {
  //         //   se getInstance retornar null
  //         //   const bsModal = new (window as any).bootstrap.Modal(modalElement);
  //         //   bsModal.hide();
  //         // }

  //       }

  //     }
  //   })
  // }





}
