import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService extends BaseService {

constructor(httpClient : HttpClient) {
  super(httpClient);
  this.controller = 'Plantilla';
 }
}
