export interface MenuDesplegable {
  TituloPrincipal: string;
  Icono? : string;
  Ruta: string;
  Secciones: MenuDesplegable[];
  Rol : string;
}
