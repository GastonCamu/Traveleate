import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SignalsService {

  idViaje = signal(0);
  idColectivo = signal(0);
  precioViaje = signal(0);
  
  idButaca = signal(0);
  precioButaca = signal(0);

  constructor() { }
}
