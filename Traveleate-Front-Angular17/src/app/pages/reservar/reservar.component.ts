import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ColectivoService } from '../../services/colectivo.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { IReserva } from '../../models/reserva';
import { ViajeService } from '../../services/viaje.service';
import { SignalsService } from '../../services/signals.service';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.scss'
})
export class ReservarComponent implements OnInit{
  private formBuild = inject(FormBuilder);
  private reservarService = inject(ReservaService);
  private viajeService = inject(ViajeService);
  private signalsService = inject(SignalsService);

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
    const reserva: IReserva = {
      idReserva: this.formReserva.value.idReserva,
      nombreCliente: this.formReserva.value.nombre,
      apellidoCliente: this.formReserva.value.apellido,
      dniCliente: this.formReserva.value.dni,
      mayorEdad: this.formReserva.value.mayorEdad,
      idButaca: this.signalsService.idButaca(),
      idViaje: this.signalsService.idViaje(),
      precioTotal: this.precioTotal
    }

    this.reservarService.enviarReserva(reserva).subscribe({
      next:(res)=>{
        this.ReservarButaca()
        this.router.navigate(["/"])
      },
      error:(err)=>{
        console.log(err.message);
      },
    });
  }

  
  ReservarButaca() {
    this.viajeService.GuardarButaca(this.signalsService.idViaje(), this.signalsService.idButaca()).subscribe({});
  }
  
  Volver() {
    this.router.navigate(["/"])
  }

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.precioTotal = Number(this.signalsService.precioViaje()) + Number(this.signalsService.precioButaca());
  }


}
