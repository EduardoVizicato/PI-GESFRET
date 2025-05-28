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

  constructor(private HttpCient: HttpClient) {}

  getAllLoad(): Observable<load[]> {
    return this.HttpCient.get<load[]>(`${this.apiUrl}`)
  }

  addLoad(load: load): Observable<load[]> {
    return this.HttpCient.post<load[]>(`${this.apiUrl}`, load)
  }




 



}
