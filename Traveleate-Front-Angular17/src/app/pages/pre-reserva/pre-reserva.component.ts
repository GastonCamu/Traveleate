import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ColectivoService } from '../../services/colectivo.service';
import { CommonModule } from '@angular/common';
import { ButacaService } from '../../services/butaca.service';
import { IButaca } from '../../models/butaca';
import { CategoriaButacaService } from '../../services/categoria-butaca.service';
import { ICategoriaButaca } from '../../models/categoriaButaca';
import { ViajeService } from '../../services/viaje.service';
import { IViaje } from '../../models/viaje';
import { SignalsService } from '../../services/signals.service';


@Component({
  selector: 'app-pre-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pre-reserva.component.html',
  styleUrl: './pre-reserva.component.scss'
})
export class PreReservaComponent{

  private colectivoService = inject(ColectivoService);
  private butacaService = inject(ButacaService);
  private catButacaService = inject(CategoriaButacaService);
  private viajeService = inject(ViajeService);
  private signalsService = inject(SignalsService);

  viaje! : IViaje;
  totalButacas! : number;
  butacas: IButaca[] = [];
  butaca! : IButaca;
  categoriaButaca! : ICategoriaButaca;
  ButacasReservadas! : number[];
  coincidencia : boolean = false;
  butacaSeleccionada : number = 0;

  obtenerViaje() {
    this.viajeService.obtenerViaje(this.signalsService.idViaje()).subscribe({
      next:(res) =>{
        this.viaje = res.data;
        this.ButacasReservadas = this.viaje.butacasReservadas;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  
  obtenerCantButacas() {
    if (this.signalsService.idColectivo() == 0) {
      alert("Ups, algo salió mal, inténtelo de nuevo")
      this.router.navigate(['/']);
    }
    this.colectivoService.obtenerCantButacas(this.signalsService.idColectivo()).subscribe({
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
  
  constructor(private router:Router) {
    this.obtenerCantButacas();
    this.obtenerViaje();
  }

  enviarReserva() {
    if (this.butacaSeleccionada == 0) {
      alert("Debe seleccionar una butaca")
    }
    else {
      this.viajeService.obtenerButacasReservadas(this.signalsService.idViaje()).subscribe({
      next:(res)=>{
        this.ButacasReservadas = res.data;
      },
      error:(err)=>{
        console.log(err.message);
      },
      complete:()=>{
        this.validacionReserva(this.butacaSeleccionada);
        if (this.coincidencia) {
          alert("La butaca ya fue reservada");
          this.router.navigate(['/']);
        }
        else {
          this.signalsService.guardarIdButaca(this.butacaSeleccionada);
          this.signalsService.guardarPrecioButaca(this.categoriaButaca.precio);
          this.router.navigate(['/reservar']);
        }
      }
    }) 
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
