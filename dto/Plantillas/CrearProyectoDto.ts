import { PersonalizacionDto } from "../Proyecto/PersonalizacionDto";
import { ProyectoDto } from "../Proyecto/ProyectoDto";
import { BaseDatosTienda } from "./Tienda/BaseDatosTienda";
import { CategoriaDto } from "./Tienda/CategoriaDto";
import { PlantillaTiendaLink } from "./Tienda/PlantillaTiendaLink";
import { ProductoDto } from "./Tienda/ProductoDto";

export interface CrearProyectoDto {
  Usuario : string;
  Nombre : string;
  Plantilla : string;
  Ruta? : string;
  Personalizacion : PersonalizacionDto;
  BaseDatosTienda : BaseDatosTienda;
}
