import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
   downloadTravelPdf(id: string): Observable<ArrayBuffer> {
    const url = `${this.apiUrl}/download/${id}`;
    return this.HttpClient.get(url, { responseType: 'arraybuffer' as 'arraybuffer' });
  }

  downloadTravelPdfWithResponse(id: string): Observable<HttpResponse<ArrayBuffer>> {
    const url = `${this.apiUrl}/download/${id}`;
    return this.HttpClient.get(url, {
      responseType: 'arraybuffer' as 'arraybuffer',
      observe: 'response' as 'response'
    }) as Observable<HttpResponse<ArrayBuffer>>;
  }
}
