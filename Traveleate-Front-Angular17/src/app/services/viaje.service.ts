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

  obtenerViaje(id: number) {
    return this.http.get<ResponseAPI>(`${this.apiUrl}/${id}`);
  }

  obtenerButacasReservadas(id: number) {
    const urlConParametros = `${this.apiUrl}/${id}/ButacasReservadas`;
    return this.http.get<ResponseAPI>(urlConParametros);
  }

  GuardarButaca(idViaje: number, numeroButaca: number) {
    const url = `${this.apiUrl}/${idViaje}/AgregarButaca?numeroButaca=${numeroButaca}`;
    return this.http.post<ResponseAPI>(url, null);
  }  
  
}
