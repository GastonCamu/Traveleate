import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ColectivoService } from '../../services/colectivo.service';
import { CommonModule } from '@angular/common';
import { ButacaService } from '../../services/butaca.service';
import { IButaca } from '../../models/butaca';
import { CategoriaButacaService } from '../../services/categoria-butaca.service';
import { ICategoriaButaca } from '../../models/categoriaButaca';

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

  @Input('idViaje')idViaje! : number;
  @Input('idColectivo')idColectivo! : number;
  @Input('precioViaje')precioViaje! : number;

  totalButacas! : number;
  butacas: any[] = [];
  butaca! : IButaca;
  categoriaButaca! : ICategoriaButaca;

  obtenerCantButacas() {
    this.colectivoService.obtenerCantButacas(this.idColectivo).subscribe({
      next:(res)=>{
        this.totalButacas = res.data;
        this.butacas = Array(this.totalButacas).fill(0);
      }
    })
  }

  enviarReserva() {
    this.router.navigate(['/reservar',this.idViaje,this.idColectivo,this.precioViaje,this.butaca.idButaca,this.categoriaButaca.precio]);
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
  
  elegirButaca(idButaca: number) {
    this.obtenerButaca(idButaca);
  }


  constructor(private router:Router) {}

  ngOnInit(): void {
    this.obtenerCantButacas();
  }
}
