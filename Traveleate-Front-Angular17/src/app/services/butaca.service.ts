import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseAPI } from '../models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class ButacaService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "Butaca";

  constructor() { }

}
