import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Travel, Truck } from '../model/travel.model';
import { TokenService } from '../../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private enterpriseId: string | null;
  private apiUrl = `${environment.api}/api/`;

  constructor(private HttpClient: HttpClient, private TokenService: TokenService) {
    this.enterpriseId = this.TokenService.getEnterpriseId();
    console.log('Enterprise ID in TravelService:', this.enterpriseId);
  }

  getAllTrucks(): Observable<Truck[]> {
    return this.HttpClient.get<Truck[]>(`${this.apiUrl}vehicle/getAllActivedVehicles`);
  }
  getAllTravel(isCancelled?: boolean): Observable<Travel[]> {
    let params = new HttpParams().set('enterpriseId', String(this.enterpriseId));

    if (isCancelled !== undefined) {
      params = params.set('isCancelled', String(isCancelled));
    }

    const url = `${this.apiUrl}travel/getAllTravels`;

    return this.HttpClient.get<Travel[]>(url, { params });
  }
  getTravelById(id: string): Observable<Travel> {
    return this.HttpClient.get<Travel>(`${this.apiUrl}travel/getTravelById?id=${id}`);
  }
  addTravel(travel: FormData): Observable<any> {
    return this.HttpClient.post(`${this.apiUrl}travel/addTravel`, travel);
  }
  updateTravel(travel: Travel, id: string): Observable<Travel> {
    return this.HttpClient.put<Travel>(`${this.apiUrl}travel/updateTravel/${id}`, travel);
  }
  deleteTravel(id: string): Observable<Travel> {
    return this.HttpClient.delete<Travel>(`${this.apiUrl}travel/cancelTravel?id=${id}`)
  }
  getTruckById(id: string): Observable<Truck> {
    return this.HttpClient.get<Truck>(`${environment.api}/api/vehicle/getVehicleById?id=${id}`);
  }

}
