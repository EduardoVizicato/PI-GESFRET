import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadService } from './Services/load.service';
import { load } from './models/load.model';

@Component({
  selector: 'app-loads',
  
  imports: [SidebarComponent],
  templateUrl: './loads.component.html',
  styleUrl: './loads.component.css'
})

export class LoadsComponent implements OnInit {

  load: load[] = [];

  constructor(private loadServive: LoadService){

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

}
