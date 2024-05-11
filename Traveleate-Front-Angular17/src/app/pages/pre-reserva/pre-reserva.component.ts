import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ColectivoService } from '../../services/colectivo.service';
import { CommonModule } from '@angular/common';
import { ButacaService } from '../../services/butaca.service';
import { IButaca } from '../../models/butaca';
import { CategoriaButacaService } from '../../services/categoria-butaca.service';
import { ICategoriaButaca } from '../../models/categoriaButaca';
import { ViajeService } from '../../services/viaje.service';

@Component({
  selector: 'app-pre-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pre-reserva.component.html',
  styleUrl: './pre-reserva.component.scss'
})
export class PreReservaComponent implements OnInit {

  private colectivoService = inject(ColectivoService);
  private butacaService = inject(ButacaService);
  private catButacaService = inject(CategoriaButacaService);
  private viajeService = inject(ViajeService);

  @Input('idViaje')idViaje! : number;
  @Input('idColectivo')idColectivo! : number;
  @Input('precioViaje')precioViaje! : number;

  totalButacas! : number;
  butacas: IButaca[] = [];
  butaca! : IButaca;
  categoriaButaca! : ICategoriaButaca;
  ButacasReservadas! : number[];
  coincidencia : boolean = false;
  butacaSeleccionada! : number;

  obtenerListaButacasReservadas() {
    this.viajeService.obtenerButacasReservadas(this.idViaje).subscribe({
      next:(res)=>{
        this.ButacasReservadas = res.data;
      },
      error:(err)=>{
        console.log(err.message);
      }
    });
  }
  
  obtenerCantButacas() {
    this.colectivoService.obtenerCantButacas(this.idColectivo).subscribe({
      next:(res)=>{
        this.totalButacas = res.data;
        this.butacas = Array(this.totalButacas).fill(0);
      }
    })
  }

  obtenerButaca(idButaca: number) {
    this.butacaService.obtenerButaca(idButaca).subscribe({
      next:(res)=>{
        this.butaca = res.data;
        this.obtenerCategoriaButaca();
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  obtenerCategoriaButaca() {
    this.catButacaService.obtenerCategoriaButaca(this.butaca.idCategoriaButaca).subscribe({
      next:(res)=>{
        this.categoriaButaca = res.data;
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  elegirButaca(butacaSeleccionada: number) {
    this.butacaSeleccionada = butacaSeleccionada;
    this.obtenerButaca(butacaSeleccionada);
  }
  
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.obtenerCantButacas();
    this.obtenerListaButacasReservadas();
  }

  enviarReserva() {
    this.validacionReserva(this.butacaSeleccionada);
    if (this.coincidencia) {
      alert("La butaca ya fue reservada");
      this.router.navigate(['/']);
    }
    else {
      this.router.navigate(['/reservar',this.idViaje,this.idColectivo,this.precioViaje,this.butaca.idButaca,this.categoriaButaca.precio]);
    }
  }

  Volver() {
    this.router.navigate(['/']);
  }

  validacionReserva(idButaca: number) {
    this.ButacasReservadas.forEach(nroButaca => {
      if(nroButaca == idButaca) {
        this.coincidencia = true;
      }
    })
  }

}
