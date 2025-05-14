import { Component } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruckService } from './Services/truck.service';
import { Truck } from './models/truck.model';

@Component({
  selector: 'app-trucks',
  imports: [SidebarComponent,HttpClientModule,FormsModule, CommonModule],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent {

  trucks: Truck[] = [];

  constructor(private truckService: TruckService) {

   }
   getAllTrucks() {
    this.truckService.getAllTrucks().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error fetching trucks:', error);
      }
    );
  }
}
