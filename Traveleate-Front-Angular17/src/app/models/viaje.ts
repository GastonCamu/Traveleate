export interface IViaje {
    idViaje:         number;
    localidadOrigen: string;
    localidadDestino: string;
    fecha: Date;
    idColectivo: number;
    butacasReservadas: number[];
    precioViaje: number;

}
