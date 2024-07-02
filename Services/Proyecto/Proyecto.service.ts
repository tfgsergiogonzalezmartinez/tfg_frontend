import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService extends BaseService {
  private proyectoSeleccionado! : any | null;
  private isNuevoProyecto : boolean = true;
  private isAbrirProyecto : boolean = false;

  constructor(httpClient : HttpClient) {
    super(httpClient);
  }


  crearProyecto(){
    this.isNuevoProyecto = true;
  }

  abrirProyecto(proyecto: any){
    this.proyectoSeleccionado = proyecto;
    this.isAbrirProyecto = true;
  }

  closeProyecto(){
    this.proyectoSeleccionado = null;
    this.isAbrirProyecto = false;
    this.isNuevoProyecto = false;
  }

  getIsNuevoProyecto(){
    return this.isNuevoProyecto;
  }
  getIsAbrirProyecto(){
    return this.isAbrirProyecto;
  }







}
