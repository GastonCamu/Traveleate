import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ColectivoService } from '../../services/colectivo.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { IReserva } from '../../models/reserva';
import { ViajeService } from '../../services/viaje.service';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.scss'
})
export class ReservarComponent implements OnInit{
  public formBuild = inject(FormBuilder);
  public reservarService = inject(ReservaService);
  public viajeService = inject(ViajeService);

  @Input('idViaje')idViaje! : number;
  @Input('idColectivo')idColectivo! : number;
  @Input('precioViaje')precioViaje! : number;
  @Input('idButaca')idButaca! : number;
  @Input('precioButaca')precioButaca! : number;

  precioTotal! : number;

  public formReserva:FormGroup = this.formBuild.group({
    idReserva: [0],
    nombre: [''],
    apellido: [''],
    dni: [''],
    mayorEdad: [false],
    idButaca: [0],
    idViaje: [0],
    precioTotal: [0]
  });

  Reservar() {
    console.log(this.precioTotal)
    const reserva: IReserva = {
      idReserva: this.formReserva.value.idReserva,
      nombreCliente: this.formReserva.value.nombre,
      apellidoCliente: this.formReserva.value.apellido,
      dniCliente: this.formReserva.value.dni,
      mayorEdad: this.formReserva.value.mayorEdad,
      idButaca: this.idButaca,
      idViaje: this.idViaje,
      precioTotal: this.precioTotal
    }

    this.reservarService.enviarReserva(reserva).subscribe({
      next:(res)=>{
        console.log(reserva)
        this.ReservarButaca()
        this.router.navigate(["/"])
      },
      error:(err)=>{
        console.log(err.message);
      },
    });
  }

  
  ReservarButaca() {
    this.viajeService.GuardarButaca(this.idViaje, this.idButaca).subscribe({});
  }
  
  Volver() {
    this.router.navigate(["/"])
  }

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.precioTotal = Number(this.precioViaje) + Number(this.precioButaca);
  }


}
