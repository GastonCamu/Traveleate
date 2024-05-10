import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ColectivoService } from '../../services/colectivo.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.scss'
})
export class ReservarComponent{
  public formBuild = inject(FormBuilder);

  @Input('idViaje')idViaje! : number;
  @Input('idColectivo')idColectivo! : number;
  @Input('precioViaje')precioViaje! : number;
  @Input('idButaca')idButaca! : number;
  @Input('precioButaca')precioButaca! : number;

  public formReserva:FormGroup = this.formBuild.group({
    nombre: [''],
    apellido: [''],
    dni: [''],
    mayorEdad: [false],
    idButaca: [this.idButaca],
    idViaje: [this.idViaje],
    precioTotal: [this.precioViaje + this.precioButaca]

  })

  Reservar() {
    
  }

  constructor(private router:Router) {}

}
