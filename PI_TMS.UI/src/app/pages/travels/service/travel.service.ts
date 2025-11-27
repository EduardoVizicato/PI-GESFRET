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

  private apiUrl = `${environment.api}/api/`;

  constructor(private HttpClient: HttpClient, private TokenService: TokenService) { }

  // Helper para pegar o ID sempre atualizado
  private get enterpriseId(): string | null {
    return this.TokenService.getEnterpriseId();
  }

  getAllTrucks(): Observable<Truck[]> {
    let params = new HttpParams().set('enterpriseId', String(this.enterpriseId));
    return this.HttpClient.get<Truck[]>(`${this.apiUrl}vehicle/getAllActivedVehicles`, { params });
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

  updateTravel(travel: any, id: string): Observable<any> {
    return this.HttpClient.put<any>(`${this.apiUrl}travel/updateTravel/${id}`, travel);
  }

  deleteTravel(id: string): Observable<Travel> {
    return this.HttpClient.delete<Travel>(`${this.apiUrl}travel/cancelTravel?id=${id}`)
  }

  getTruckById(id: string): Observable<Truck> {
    return this.HttpClient.get<Truck>(`${environment.api}/api/vehicle/getVehicleById?id=${id}`);
  }

}