import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Travel } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.api}/api/`;


  constructor(private HttpClient: HttpClient) { }

  getAllTravel(): Observable<Travel[]> {
    return this.HttpClient.get<Travel[]>(`${this.apiUrl}travel/getAllTravels`);
  }

}
