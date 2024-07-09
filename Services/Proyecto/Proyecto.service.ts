import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { HttpClient } from '@angular/common/http';
import { PlantillaTiendaLink } from '../../dto/Plantillas/Tienda/PlantillaTiendaLink';
import { PersonalizacionPlantillaDto } from '../../dto/Plantillas/PersonalizacionPlantillaDto';
import { ProyectoDto } from '../../dto/Proyecto/ProyectoDto';
import { CategoriaLink } from '../../dto/Plantillas/Tienda/CategoriaLink';
import { ProductoLink } from '../../dto/Plantillas/Tienda/ProductoLink';
import { PlantillaDto } from '../../dto/Plantillas/PlantillaDto';
import { CrearProyectoDto } from '../../dto/Plantillas/CrearProyectoDto';
import { BaseDatosTienda } from '../../dto/Plantillas/Tienda/BaseDatosTienda';
import { ProductoDto } from '../../dto/Plantillas/Tienda/ProductoDto';
import { CategoriaDto } from '../../dto/Plantillas/Tienda/CategoriaDto';
import { Observable } from 'rxjs';
import { ImportarBaseDatosComponent } from '../../src/app/Components/ImportarBaseDatos/ImportarBaseDatos.component';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService extends BaseService {
  private proyectoSeleccionado!: any | null;
  private nuevoProyecto!: CrearProyectoDto | null;

  private plantillaSeleccionada!: PlantillaDto | null;
  private plantillaDto: PlantillaTiendaLink = {} as PlantillaTiendaLink;
  private personalizacionPlantillaDto: PersonalizacionPlantillaDto = {} as PersonalizacionPlantillaDto

  private isNuevoProyecto: boolean = false;
  private isAbrirProyecto: boolean = false;

  private tiendaDb: BaseDatosTienda = {} as BaseDatosTienda;
  private listaProductosDb: ProductoDto[] = [];
  private listaCategoriaDb: CategoriaDto[] = [];

  private importadores: ImportarBaseDatosComponent[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.controller = 'Proyecto';
    const linkTienda: PlantillaTiendaLink = {
      CategoriaLink: {} as CategoriaLink,
      ProductoLink: {} as ProductoLink
    }
    this.plantillaDto = linkTienda;
  }

  GetProyectosUsuario(idUsuario: string) {
    return this.httpClient.get<ProyectoDto[]>(this.apiIp + this.controller + "/GetProyectosUsuario/" + idUsuario, { headers: this.getHeaders() });
  }

  generarProyecto(proyecto: CrearProyectoDto): Observable<Blob> {
    return this.httpClient.post(`${this.apiIp}${this.controller}/GenerarProyecto`, proyecto, {
      responseType: 'blob',
      headers: this.getHeaders(),
    });
  }

  descargarProyecto(idUsuario: string, nombreProyecto: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.apiIp}${this.controller}/DescargarProyecto/${idUsuario}/${nombreProyecto}`, {
      responseType: 'blob' as 'json',
      headers: this.getHeaders(),
    });
  }

  eliminarProyecto(proyectoDto: ProyectoDto) {
    return this.httpClient.post(this.apiIp + this.controller + "/EliminarProyecto/", proyectoDto, { headers: this.getHeaders() });
  }




  crearProyecto() {
    this.clearProyectos();
    this.isNuevoProyecto = true;
  }





  abrirProyecto(proyecto: any) {
    this.proyectoSeleccionado = proyecto;
    this.isAbrirProyecto = true;
  }

  closeProyecto() {
    this.proyectoSeleccionado = null;
    this.isAbrirProyecto = false;
    this.isNuevoProyecto = false;
  }

  getIsNuevoProyecto() {
    return this.isNuevoProyecto;
  }
  getIsAbrirProyecto() {
    return this.isAbrirProyecto;
  }

  getPlantillaSeleccionada() {
    return this.plantillaSeleccionada;
  }
  setPlantillaSeleccionada(plantilla: PlantillaDto | null) {
    this.plantillaSeleccionada = plantilla;
  }
  getPlantillaLinkDto() {
    return this.plantillaDto;
  }
  setPlantillaLinkDto(plantillaDto: PlantillaTiendaLink) {
    this.plantillaDto = plantillaDto;
  }
  setPlantillaLink_productos(productoLink: ProductoLink) {
    this.plantillaDto.ProductoLink = productoLink;
  }
  setPlantillaLink_categorias(categoriaLink: CategoriaLink) {
    this.plantillaDto.CategoriaLink = categoriaLink
  }
  getPlantillaLink_productos() {
    return this.plantillaDto.ProductoLink;
  }
  getPlantillaLink_categorias() {
    return this.plantillaDto.CategoriaLink;
  }

  getNuevoProyecto() {
    return this.nuevoProyecto;
  }


  getBaseDatosTienda() {
    return this.tiendaDb;
  }
  setBaseDatosTienda(db: BaseDatosTienda) {
    this.tiendaDb = db;
  }

  getListaProductosDb() {
    return this.listaProductosDb;
  }
  setListaProductosDb(lista: ProductoDto[]) {
    this.listaProductosDb = lista;
  }
  getListaCategoriaDb() {
    return this.listaCategoriaDb;
  }
  setListaCategoriaDb(lista: CategoriaDto[]) {
    this.listaCategoriaDb = lista;
  }


  clearProyectos() {
    this.plantillaDto = {} as PlantillaTiendaLink;
    this.plantillaDto.CategoriaLink = {} as CategoriaLink;
    this.plantillaDto.ProductoLink = {} as ProductoLink;
    this.nuevoProyecto = null;
    this.plantillaSeleccionada = null;
  }

  getImportadores() {
    return this.importadores;
  }
  addImportador(importador: ImportarBaseDatosComponent) {
    this.importadores.push(importador);
  }
  removeImportador(importador: ImportarBaseDatosComponent) {
    this.importadores = this.importadores.filter(i => i != importador);
  }
  clearImportadores() {
    this.importadores = [];
  }











}
