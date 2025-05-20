import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Truck } from '../models/truck.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TruckService {

   
  private apiUrl = `${environment.api}/api/vehicle/`;

  constructor(private HttpClient: HttpClient) {}

  getAllTrucks(): Observable<Truck[]> {
    return this.HttpClient.get<Truck[]>(`${this.apiUrl}getAllVehicles`);
  }
}
