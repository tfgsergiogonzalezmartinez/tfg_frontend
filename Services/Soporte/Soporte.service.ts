import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { HttpClient } from '@angular/common/http';
import { SoporteAsignarPeticionDto } from '../../dto/SoporteDto/SoporteAsignarPeticionDto';
import { PeticionSoporteGetDto } from '../../dto/SoporteDto/PeticionSoporteGetDto';

@Injectable({
  providedIn: 'root'
})
export class SoporteService extends BaseService {

 constructor(httpClient: HttpClient) {
  super(httpClient);
  this.controller = 'Soporte';
  }

  public GetPeticionByUsuario(usuarioId: string) {
    return this.httpClient.get<PeticionSoporteGetDto[]>(this.apiIp + this.controller + "/GetPeticionByUsuario/" + usuarioId, { headers: this.getHeaders() });
  }
  public AbrirPeticion(peticionId: string) {
    return this.httpClient.post<PeticionSoporteGetDto>(this.apiIp + this.controller + "/AbrirPeticion/" , peticionId, { headers: this.getHeaders() });
  }
  public CerrarPeticion(peticionId: string) {
    return this.httpClient.post<PeticionSoporteGetDto>(this.apiIp + this.controller + "/CerrarPeticion/" , peticionId, { headers: this.getHeaders() });
  }
  public GetPeticionesCerradas() {
    return this.httpClient.get<PeticionSoporteGetDto[]>(this.apiIp + this.controller + "/GetPeticionesCerradas", { headers: this.getHeaders() });
  }
  public GetPeticionesAbiertas() {
    return this.httpClient.get<PeticionSoporteGetDto[]>(this.apiIp + this.controller + "/GetPeticionesAbiertas", { headers: this.getHeaders() });
  }
  public AsignarPeticionAdmin(idPeticion: string, idAdmin: string) {
    const request : SoporteAsignarPeticionDto = {IdPeticion : idPeticion, IdUsuarioAdmin : idAdmin};
    return this.httpClient.post<PeticionSoporteGetDto>(this.apiIp + this.controller + "/AsignarPeticionAdmin/" + idPeticion + "/", request, { headers: this.getHeaders() });
  }




}
