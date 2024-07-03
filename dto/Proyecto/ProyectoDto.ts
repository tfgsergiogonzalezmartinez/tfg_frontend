import { Entidad } from "../Entidad";
import {PersonalizacionDto } from "./PersonalizacionDto";

export interface ProyectoDto extends Entidad {
  Usuario : string;
  Nombre : string;
  Plantilla : string;
  Ruta? : string;
  Personalizacion : PersonalizacionDto;
}
