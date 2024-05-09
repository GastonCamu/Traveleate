import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseAPI } from '../models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "Localidad";

  constructor() { }

  obtenerLocalidades() {
    return this.http.get<ResponseAPI>(this.apiUrl);
  }
}
