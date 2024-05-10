import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.scss'
})
export class ReservarComponent implements OnInit {

  @Input('id')idViaje! : number;

  obtenerCantButacas() {
    
  }

  constructor(private router:Router) {}

  ngOnInit(): void {
    
  }


}
