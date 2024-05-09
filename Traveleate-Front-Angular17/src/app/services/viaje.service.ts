import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseAPI } from '../models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "Viaje";

  constructor() { }

  obtenerViajes(origen:string, destino:string, fecha:string) {
    const urlConParametros = `${this.apiUrl}/${origen}/${destino}/${fecha}`;
    return this.http.get<ResponseAPI>(urlConParametros);
  }
}
