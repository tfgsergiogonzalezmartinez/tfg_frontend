import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductoLink } from '../../../../dto/Plantillas/Tienda/ProductoLink';
import { CategoriaLink } from '../../../../dto/Plantillas/Tienda/CategoriaLink';
import { ImportadorService } from '../../../../Services/Importador/Importador.service';
import { PlantillaDto } from '../../../../dto/Plantillas/Tienda/PlantillaDto';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';
@Component({
  selector: 'app-ImportarBaseDatos',
  templateUrl: './ImportarBaseDatos.component.html',
  styleUrls: ['./ImportarBaseDatos.component.css']
})
export class ImportarBaseDatosComponent implements OnInit, AfterViewInit {
  @Input() NombreDatos : string = "Datos";
  @Input() NombreModelo : string = "Datos";
  @ViewChild('input') inputRef! : ElementRef;

  isImportado : boolean = true;

  modelo_mostrar : string[] = [];
  modelo_tienda_producto_campos : string[] = ["Nombre", "Descripcion", "Precio", "Stock","Colores", "Tallas","FotoPrincipal", "Fotos", "Categoria"];
  modelo_tienda_categoria_campos : string[] = ["Nombre", "CategoriaPadre"];
  modelo_tienda_producto! :  ProductoLink & { [key: string]: any };
  modelo_tienda_categoria! : CategoriaLink & { [key: string]: any };
  canContinuar : boolean = false;

  headers : string[] = [];
  data : any[] = [];









  constructor(private renderer : Renderer2, private importadorService : ImportadorService, private proyectoService: ProyectoService) { }

  ngOnInit() {
    if (this.NombreModelo == "Producto"){
      this.modelo_mostrar = this.modelo_tienda_producto_campos;
    }
    if (this.NombreModelo == "Categoria"){
      this.modelo_mostrar = this.modelo_tienda_categoria_campos;
    }
  }
  ngAfterViewInit(): void {
    this.renderer.listen(this.inputRef.nativeElement, 'change', (event) => {
      this.procesarArchivo(event);
    });
  }

  producto_enlazar( campoProducto : string, campoArchivo: any){
    console.log(campoArchivo);
    if (this.NombreModelo == "Producto"){
      if (!this.modelo_tienda_producto) {
        this.modelo_tienda_producto = {} as ProductoLink;
        this.modelo_tienda_producto[campoProducto] = campoArchivo.target.value;
        return;
      }
      this.modelo_tienda_producto[campoProducto] = campoArchivo.target.value;
      console.log(this.modelo_tienda_producto);
    }

    if (this.NombreModelo == "Categoria"){
      if (!this.modelo_tienda_categoria) {
        this.modelo_tienda_categoria = {} as CategoriaLink;
        this.modelo_tienda_categoria[campoProducto] = campoArchivo.target.value;
        return;
      }
      this.modelo_tienda_categoria[campoProducto] = campoArchivo.target.value;
      console.log(this.modelo_tienda_categoria);
    }

    for (let campo of this.modelo_mostrar){
      if (this.NombreModelo == "Producto" && !this.modelo_tienda_producto[campo]){
        this.canContinuar = false;
        return;
      }
      if (this.NombreModelo == "Categoria" && !this.modelo_tienda_categoria[campo]){
        this.canContinuar = false;
        return;
      }
    }
    this.canContinuar = true;
    const plantillaDto : PlantillaDto = {
      CategoriaLink: this.modelo_tienda_categoria,
      ProductoLink: this.modelo_tienda_producto
    }
    this.proyectoService.setPlantillaDto(plantillaDto);
  }


  cargarArchivo(){
    this.inputRef.nativeElement.click();
  }


  //El archivo que voy a añadir es de texto : json o csv
  procesarArchivo(event : any){
    const input = event.target as HTMLInputElement;
    const file: File | null = input.files?.[0] || null;
    if (file) {
      this.importadorService.cargarCSV(file).then(result => {
        this.headers = result.headers;
        this.data = result.data;
        this.isImportado = true;

      }).catch(error => {
        console.error('Error al cargar el archivo CSV:', error);
      });
    }
  }

  crearProyecto(){

  }

}
