import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
