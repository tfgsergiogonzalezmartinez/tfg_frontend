import { CategoriaDto } from "./CategoriaDto";
import { ProductoDto } from "./ProductoDto";

export interface BaseDatosTienda {
  Productos : ProductoDto[];
  Categorias : CategoriaDto[];
}
