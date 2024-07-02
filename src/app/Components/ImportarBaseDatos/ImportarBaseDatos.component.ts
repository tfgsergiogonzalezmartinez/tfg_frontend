import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductoLink } from '../../../../dto/Plantillas/Tienda/ProductoLink';
import { CategoriaLink } from '../../../../dto/Plantillas/Tienda/CategoriaLink';
import { ImportadorService } from '../../../../Services/Importador/Importador.service';
@Component({
  selector: 'app-ImportarBaseDatos',
  templateUrl: './ImportarBaseDatos.component.html',
  styleUrls: ['./ImportarBaseDatos.component.css']
})
export class ImportarBaseDatosComponent implements OnInit, AfterViewInit {
  @Input() NombreDatos : string = "Datos";
  @ViewChild('input') inputRef! : ElementRef;

  isImportado : boolean = true;


  modelo_tienda_producto_campos = ["Nombre", "Descripcion", "Precio", "Stock","Colores", "Tallas","FotoPrincipal", "Fotos", "Categoria"];
  modelo_tienda_categoria_campos = ["Nombre", "CategoriaPadre"];
  modelo_tienda_producto! :  ProductoLink & { [key: string]: any };
  modelo_tienda_categoria! : CategoriaLink

  headers : string[] = [];
  data : any[] = [];







  constructor(private renderer : Renderer2, private importadorService : ImportadorService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.renderer.listen(this.inputRef.nativeElement, 'change', (event) => {
      this.procesarArchivo(event);
    });
  }

  producto_enlazar(campoProducto : string, campoArchivo: any){
    console.log(campoArchivo);
    if (!this.modelo_tienda_producto) {
      //productoLink es una interfaz
      this.modelo_tienda_producto = {} as ProductoLink;
      this.modelo_tienda_producto[campoProducto] = campoArchivo.target.value;
      return;
    }
    this.modelo_tienda_producto[campoProducto] = campoArchivo.target.value;
    console.log(this.modelo_tienda_producto);
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

}
