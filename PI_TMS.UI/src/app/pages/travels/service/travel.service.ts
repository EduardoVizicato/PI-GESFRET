import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
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
  getAllTravel(isCancelled?: boolean): Observable<Travel[]> {
    return this.HttpClient.get<Travel[]>(`${this.apiUrl}travel/getAllTravels?isCancelled=${isCancelled}`).pipe(
      tap(res => console.log(res))
    );
  }
  getTravelById(id: string): Observable<Travel> {
    return this.HttpClient.get<Travel>(`${this.apiUrl}travel/getTravelById?id=${id}`);
  }
  addTravel(travel: Travel): Observable<Travel> {
    return this.HttpClient.post<Travel>(`${this.apiUrl}travel/addTravel`, travel);
  }
  updateTravel(travel: Travel, id: string): Observable<Travel> {
    return this.HttpClient.put<Travel>(`${this.apiUrl}travel/updateTravel/${id}`, travel);
  }
  deleteTravel(id: string): Observable<Travel> {
    return this.HttpClient.delete<Travel>(`${this.apiUrl}travel/deleteTravel/${id}`)
  }



}
