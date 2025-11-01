import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { enterprise } from '../model/enterprise.model';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  private apiUrl = `${environment.api}/api/enterprise`;

  constructor(private HttpClients: HttpClient) { }

  registerEnterprise(enterprise: enterprise) {
    return this.HttpClients.post<enterprise>(`${this.apiUrl}/addEnterprise`, enterprise);
  }
}
