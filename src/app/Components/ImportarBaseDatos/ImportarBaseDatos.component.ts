import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductoLink } from '../../../../dto/Plantillas/Tienda/ProductoLink';
import { CategoriaLink } from '../../../../dto/Plantillas/Tienda/CategoriaLink';
import { ImportadorService } from '../../../../Services/Importador/Importador.service';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';
import { ProductoDto } from '../../../../dto/Plantillas/Tienda/ProductoDto';
import { CategoriaDto } from '../../../../dto/Plantillas/Tienda/CategoriaDto';
import { MainService } from '../../../../Services/Main/Main.service';
@Component({
  selector: 'app-ImportarBaseDatos',
  templateUrl: './ImportarBaseDatos.component.html',
  styleUrls: ['./ImportarBaseDatos.component.css']
})
export class ImportarBaseDatosComponent implements OnInit, AfterViewInit {
  @Input() NombreDatos: string = "Datos";
  @Input() NombreModelo: string = "Datos";
  @ViewChild('input') inputRef!: ElementRef;

  isImportado: boolean = false;

  modelo_mostrar: string[] = [];
  modelo_tienda_producto_campos: string[] = ["Nombre", "Descripcion", "Precio", "Stock", "Colores", "Tallas", "Categoria"];
  modelo_tienda_categoria_campos: string[] = ["Nombre", "CategoriaPadre"];
  modelo_tienda_producto!: ProductoLink & { [key: string]: any };
  modelo_tienda_categoria!: CategoriaLink & { [key: string]: any };

  headers: string[] = [];
  data: any[] = [];









  constructor(private renderer: Renderer2, private mainService : MainService, private importadorService: ImportadorService, private proyectoService: ProyectoService) { }

  ngOnInit() {
    if (this.NombreModelo == "Producto") {
      this.modelo_mostrar = this.modelo_tienda_producto_campos;
    }
    if (this.NombreModelo == "Categoria") {
      this.modelo_mostrar = this.modelo_tienda_categoria_campos;
    }
    this.proyectoService.addImportador(this);
  }
  ngAfterViewInit(): void {
    this.renderer.listen(this.inputRef.nativeElement, 'change', (event) => {
      this.procesarArchivo(event);
    });
  }

  producto_enlazar(campoProducto: string, campoArchivo: any) {
    console.log(campoArchivo);
    if (this.NombreModelo == "Producto") {
      if (!this.modelo_tienda_producto) {
        this.modelo_tienda_producto = {} as ProductoLink;
        this.modelo_tienda_producto[campoProducto] = campoArchivo.target.value;
        return;
      }
      this.modelo_tienda_producto[campoProducto] = campoArchivo.target.value;
      console.log(this.modelo_tienda_producto);
    }

    if (this.NombreModelo == "Categoria") {
      if (!this.modelo_tienda_categoria) {
        this.modelo_tienda_categoria = {} as CategoriaLink;
        this.modelo_tienda_categoria[campoProducto] = campoArchivo.target.value;
        return;
      }
      this.modelo_tienda_categoria[campoProducto] = campoArchivo.target.value;
      console.log(this.modelo_tienda_categoria);

    }
    //si hay alguno campo nulo, reuturn
    if (this.NombreModelo == "Producto") {

      this.proyectoService.setPlantillaLink_productos(this.modelo_tienda_producto);
    }
    if (this.NombreModelo == "Categoria") {
      this.proyectoService.setPlantillaLink_categorias(this.modelo_tienda_categoria);
    }
  }


  generarBaseDedatos() {
    let listaProductosDto: ProductoDto[] = [];
    let ListaCategoriasDto: CategoriaDto[] = [];

    if (this.NombreModelo == "Producto") {

      for (const item of this.data) {
        if (item) {
          let productoDto: ProductoDto = {
            Nombre: '',
            Descripcion: '',
            Precio: 0,
            Stock: 0,
            Fotos: [],
            FotoPrincipal: '',
            Categoria: '',
            Tallas: [],
            Colores: []
          };

          for (const [key, value] of Object.entries(this.modelo_tienda_producto)) {
            switch (key) {
              case 'Nombre':
                productoDto.Nombre = item[value];
                break;
              case 'Descripcion':
                productoDto.Descripcion = item[value];
                break;
              case 'Precio':
                productoDto.Precio = Number(item[value]);
                break;
              case 'Stock':
                productoDto.Stock = Number(item[value]);
                break;
              // case 'Fotos':
              //   productoDto.Fotos = item[value] ? item[value].split(',') : [];
              //   break;
              // case 'FotoPrincipal':
              //   productoDto.FotoPrincipal = item[value];
              //   break;
              case 'Categoria':
                productoDto.Categoria = item[value];
                break;
              case 'Tallas':
                productoDto.Tallas = item[value] ? item[value].split(',') : [];
                break;
              case 'Colores':
                productoDto.Colores = item[value] ? item[value].split(',') : [];
                break;
            }
          }

          listaProductosDto.push(productoDto);
        }
      }
      this.proyectoService.setListaProductosDb(listaProductosDto);
    }

    if (this.NombreModelo == "Categoria") {
      for (const item of this.data) {
        if (item) {
          let categoriaDto: CategoriaDto = {
            Nombre: '',
            CategoriaPadre: ''
          };

          for (const [key, value] of Object.entries(this.modelo_tienda_categoria)) {
            switch (key) {
              case 'Nombre':
                categoriaDto.Nombre = item[value];
                break;
              case 'CategoriaPadre':
                categoriaDto.CategoriaPadre = item[value];
                break;
            }
          }

          ListaCategoriasDto.push(categoriaDto);
        }
      }
      this.proyectoService.setListaCategoriaDb(ListaCategoriasDto);
    }
    console.log(listaProductosDto);
  }






  cargarArchivo() {
    this.inputRef.nativeElement.click();
  }


  procesarArchivo(event: any) {
    const input = event.target as HTMLInputElement;
    if(input.files?.[0].type !== 'text/csv') {
      this.mainService.setIcono("error");
      this.mainService.setMensaje("Solo archivos .csv estan permitidos.");
      this.mainService.activarMensaje();
      return;
    }
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


}
