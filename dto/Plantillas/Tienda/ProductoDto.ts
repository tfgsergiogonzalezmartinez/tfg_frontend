
export interface ProductoDto {
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Fotos?: string[];
  FotoPrincipal?: string;
  Categoria : string;
  Tallas: string[];
  Colores: string[];

}
