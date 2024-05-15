import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import { IViaje } from '../../models/viaje';
import { ViajeService } from '../../services/viaje.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { NavComponent } from '../../layouts/nav/nav.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { SignalsService } from '../../services/signals.service';


@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [MatTableModule, CommonModule,MatButtonModule,NavComponent,FooterComponent],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.scss'
})
export class ViajesComponent implements OnInit {

  @Input('localidadOrigen')localidadOrigen! : string;
  @Input('localidadDestino')localidadDestino! : string;
  @Input('fecha')fecha! : string;

  private viajeServicio = inject(ViajeService);
  private signalsService = inject(SignalsService);
  public listaViajes:IViaje[] = [];
  displayedColumns: string[] = ['localidadOrigen', 'localidadDestino', 'hora','fecha', 'idColectivo','accion'];

  obtenerViajes() {
    this.viajeServicio.obtenerViajes(this.localidadOrigen,this.localidadDestino,this.fecha).subscribe({
      next:(res)=>{
        this.listaViajes = res.data;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  constructor(private router:Router) {}

  elegirButaca(viaje:IViaje) {
    this.signalsService.idViaje.set(viaje.idViaje);
    this.signalsService.idColectivo.set(viaje.idColectivo);
    this.signalsService.precioViaje.set(viaje.precioViaje);
    this.router.navigate(['/pre-reserva']);
  }

  ngOnInit(): void {
    this.obtenerViajes()
  }
}
