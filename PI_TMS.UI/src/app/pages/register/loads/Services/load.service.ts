import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { load } from '../models/load.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  private apiUrl = `${environment.api}/api/load/`;

  constructor(private HttpClient: HttpClient) {}

  getAllLoad(): Observable<load[]> {
    return this.HttpClient.get<load[]>(`${this.apiUrl}getAllLoads`)
  }

  addLoad(load: load): Observable<load[]> {
    return this.HttpClient.post<load[]>(`${this.apiUrl}`, load)
  }

  updateLoad(id: string, Load: load): Observable<load> {
    return this.HttpClient.put<load>(`${this.apiUrl}updateLoad?ID=${id}`, Load);
  }

  deleteLoad(id: string): Observable<void> {
    return this.HttpClient.delete<void>(`${this.apiUrl}deleteLoad?id=${id}`);
  }
  


}
