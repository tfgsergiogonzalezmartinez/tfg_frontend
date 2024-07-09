import { Entidad } from "../Entidad";
import { ModeloPlantila } from "./ModeloPlantila";

export interface PlantillaDto extends Entidad {
  Nombre : string;
  Modelos : ModeloPlantila[];
}
