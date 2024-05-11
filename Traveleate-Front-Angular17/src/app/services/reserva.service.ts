import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { IReserva } from '../models/reserva';
import { ResponseAPI } from '../models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "Reserva";


  constructor() { }

  enviarReserva(reserva:IReserva){
    return this.http.post<ResponseAPI>(this.apiUrl, reserva);
  }

}
