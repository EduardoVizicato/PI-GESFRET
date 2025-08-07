import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Travel,Truck } from '../model/travel.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {



  private apiUrl = `${environment.api}/api/`;

  constructor(private HttpClient: HttpClient) { }

  getAllTrucks(): Observable<Truck[]> {
    return this.HttpClient.get<Truck[]>(`${this.apiUrl}vehicle/getAllActivedVehicles`);
  }



}
