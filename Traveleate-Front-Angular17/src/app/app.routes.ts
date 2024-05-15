import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { ReservarComponent } from './pages/reservar/reservar.component';
import { PreReservaComponent } from './pages/pre-reserva/pre-reserva.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'viajes/:localidadOrigen/:localidadDestino/:fecha', component: ViajesComponent},
    {path: 'pre-reserva', component: PreReservaComponent},
    {path: 'reservar', component: ReservarComponent},
    {path: 'nosotros', component: NosotrosComponent},
];
