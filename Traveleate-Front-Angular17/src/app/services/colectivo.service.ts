import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseAPI } from '../models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class ColectivoService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "Colectivo";

  constructor() { }

  obtenerCantButacas(id:number) {
    return this.http.get<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
}
