import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { HttpClient } from '@angular/common/http';
import { PlantillaDto } from '../../dto/Plantillas/Tienda/PlantillaDto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService extends BaseService {
  private proyectoSeleccionado! : any | null;

  private plantillaSeleccionada! : string;
  private plantillaDto : PlantillaDto = {} as PlantillaDto;

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

  getPlandillaSeleccionada(){
    return this.plantillaSeleccionada;
  }
  setPlantillaSeleccionada(plantilla : string){
    this.plantillaSeleccionada = plantilla;
  }
  getPlantillaDto(){
    return this.plantillaDto;
  }
  setPlantillaDto(plantillaDto : PlantillaDto){
    this.plantillaDto = plantillaDto;
  }









}
