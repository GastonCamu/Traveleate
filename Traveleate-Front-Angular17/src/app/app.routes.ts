import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViajesComponent } from './pages/viajes/viajes.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'viajes/:localidadOrigen/:localidadDestino/:fecha', component: ViajesComponent},
];
