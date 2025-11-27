import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Truck } from '../models/truck.model';
import { Observable } from 'rxjs';
import { TokenService } from '../../../../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class TruckService {
  private apiUrl = `${environment.api}/api/vehicle/`;

  constructor(private HttpClient: HttpClient, private TokenService: TokenService) { }

  private get enterpriseId(): string | null {
    return this.TokenService.getEnterpriseId();
  }

  getAllTrucks(): Observable<Truck[]> {
    let params = new HttpParams().set('enterpriseId', String(this.enterpriseId));
    const url = `${this.apiUrl}getAllActivedVehicles`;

    return this.HttpClient.get<Truck[]>(url, { params });
  }

  addTruck(truck: Truck): Observable<Truck> {
    return this.HttpClient.post<Truck>(`${this.apiUrl}addVehicle`, truck);
  }

  getTruckById(id: string): Observable<Truck> {
    return this.HttpClient.get<Truck>(`${this.apiUrl}getVehicleById?id=${id}`);
  }

  updateTruck(id: string, truck: Truck): Observable<Truck> {
    return this.HttpClient.put<Truck>(`${this.apiUrl}updateVehicle?ID=${id}`, truck);
  }

  deleteTruck(id: string): Observable<void> {
    return this.HttpClient.delete<void>(`${this.apiUrl}desactiveVehicle?id=${id}`);
  }
}