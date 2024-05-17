import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  idViaje = signal<number>(0);
  idColectivo = signal<number>(0);
  precioViaje = signal<number>(0);
  
  idButaca = signal<number>(0);
  precioButaca = signal<number>(0);

  constructor() { }

  guardarIdViaje(id: number) {
    this.idViaje.set(id);
  }

  guardarIdColectivo(id: number) {
    this.idColectivo.set(id);
  }

  guardarPrecioViaje(precio: number) {
    this.precioViaje.set(precio);
  }

  guardarIdButaca(id: number) {
    this.idButaca.set(id);
  }

  guardarPrecioButaca(precio: number) {
    this.precioButaca.set(precio);
  }
  
}
