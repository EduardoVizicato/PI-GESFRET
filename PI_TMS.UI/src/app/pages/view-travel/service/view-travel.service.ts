import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Truck } from '../models/viewTravel.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ViewTravelService {

  private apiUrl = `${environment.api}/api/travel`;

  constructor(private HttpClient: HttpClient) { }

  getTravelById(id: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.apiUrl}/getTravelById?id=${id}`);
  }

  getTruckById(id: string): Observable<Truck> {
    return this.HttpClient.get<Truck>(`${environment.api}/api/vehicle/getVehicleById?id=${id}`);
  }

  downloadTravelPdf(id: string): Observable<Blob> {
    const url = `${this.apiUrl}/download`;
    const params = new HttpParams().set('id', id);
    
    return this.HttpClient.post(url, {}, { params, responseType: 'blob' });
  }
}
