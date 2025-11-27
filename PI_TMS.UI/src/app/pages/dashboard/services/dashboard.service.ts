import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Travel } from '../models/dashboard.model';
import { TokenService } from '../../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.api}/api/`;

  constructor(private HttpClient: HttpClient, private tokenService: TokenService) { }

  getAllTravel(isCancelled?: boolean): Observable<Travel[]> {
    const enterpriseId = this.tokenService.getEnterpriseId();
    let params = new HttpParams().set('enterpriseId', String(enterpriseId));

    if (isCancelled !== undefined) {
      params = params.set('isCancelled', String(isCancelled));
    }
    
    return this.HttpClient.get<Travel[]>(`${this.apiUrl}travel/getAllTravels`, { params });
  }

}