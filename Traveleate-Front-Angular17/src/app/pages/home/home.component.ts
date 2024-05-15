import { Component, inject } from '@angular/core';
import { LocalidadService } from '../../services/localidad.service';
import { ILocalidad } from '../../models/localidad';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {startWith, map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import { NavComponent } from '../../layouts/nav/nav.component';
import { FooterComponent } from '../../layouts/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    NavComponent,
    FooterComponent
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private localidadService = inject(LocalidadService);
  public listaLocalidades:ILocalidad[] = [];
  public nombresLocalidades: string[] = [];
  control = new FormControl('');
  filteredStreets?: Observable<string[]>;
  
  obtenerLocalidades() {
    this.localidadService.obtenerLocalidades().subscribe({
      next:(res)=>{
        this.listaLocalidades = res.data;

        this.obtenerNombresLocalidades();
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
  
  obtenerNombresLocalidades(){
    this.nombresLocalidades = this.listaLocalidades.map(localidad => localidad.nombreLocalidad);
  }

  constructor(private router:Router) {
    this.obtenerLocalidades();
  }


  buscar(localidadDestino:string,localidadOrigen:string, fecha:string) {
    if(localidadOrigen == '' || localidadDestino == '' || fecha == ''){
      alert("Debe rellenar todos los campos");
    }
    else {
      this.router.navigate(['/viajes', localidadOrigen, localidadDestino, fecha]);
    }
  }
  
  

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

    private _filter(value: string): string[] {
      const filterValue = this._normalizeValue(value);
      return this.nombresLocalidades.filter(street => this._normalizeValue(street).includes(filterValue));
    }

    private _normalizeValue(value: string): string {
      return value.toLowerCase().replace(/\s/g, '');
    }

    getDate(): string {
      const today = new Date();
      const year = today.getFullYear();
      let month: string | number = today.getMonth() + 1;
      let day: string | number = today.getDate();
  
      if (month < 10) {
        month = '0' + month;
      }
  
      if (day < 10) {
        day = '0' + day;
      }
  
      return `${year}-${month}-${day}`;
    }
}
