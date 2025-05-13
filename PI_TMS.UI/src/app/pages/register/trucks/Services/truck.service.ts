import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Truck } from '../models/truck.model';

@Injectable({
  providedIn: 'root',
})
export class TruckService {

   
    private apiUrl = `${environment.api}/api//`;

  constructor(private HttpClients: HttpClient) {}

  getAllTrucks() {
    return this.HttpClients.get<Truck[]>(`${this.apiUrl}trucks`);
  }
}
