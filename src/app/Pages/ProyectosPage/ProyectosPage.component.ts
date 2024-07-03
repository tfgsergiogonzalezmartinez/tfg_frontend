import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';
import { PlantillaDto } from '../../../../dto/Plantillas/PlantillaDto';
import { PlantillaService } from '../../../../Services/Plantilla/Plantilla.service';
import { ProyectoDto } from '../../../../dto/Proyecto/ProyectoDto';
import { CrearProyectoDto } from '../../../../dto/Plantillas/CrearProyectoDto';

@Component({
  selector: 'app-ProyectosPage',
  templateUrl: './ProyectosPage.component.html',
  styleUrls: ['./ProyectosPage.component.css']
})
export class ProyectosPageComponent implements OnInit, AfterViewInit {
  @ViewChild('input') inputRef! : ElementRef;

  listaPlantillas : PlantillaDto[] = [];
  listaProyectos : ProyectoDto[] = [];

  isProyectoAbierto = false;
  //Datos del nuevo proyecto:
  nombreProyecto : string = "";

  vistaPagina_main_logo : string = "";
  vistaPagina_main_titulo : string = "";
  vistaPagina_color_background : string = "";
  vistaPagina_color_botones : string = "";
  vistaPagina_color_header : string = "";
  vistaPagina_color_subHeader : string = "";
  vistaPagina_color_texto : string = "";

  logo : string = "";
  titulo : string = "";

  isLogotipoCargado : boolean = false;



  constructor(private mainService : MainService, private cdr : ChangeDetectorRef, private proyectoServices : ProyectoService, private renderer: Renderer2, private plantillaService : PlantillaService) { }

  ngOnInit() {
    this.cargarProyectos();
    this.cargarPlantillas();
  }

  cargarProyectos(){
    this.proyectoServices.GetAll().subscribe({
      next: (data) => {
        this.listaProyectos = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  cargarPlantillas(){
    this.plantillaService.GetAll().subscribe({
      next: (data) => {
        this.listaPlantillas = data;
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }

  ngAfterViewInit(): void {

  }

  activarCargaLogotipo(){

    this.inputRef.nativeElement.click();

  }

  cargarLogotipo(event : any){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Imagen = reader.result as string;
        this.logo = base64Imagen;
        this.isLogotipoCargado = true;
      };
      reader.readAsDataURL(archivo);
    }
  }



  AbrirNuevoProyecto(){
    this.nombreProyecto = "";
    this.proyectoServices.setPlantillaSeleccionada(null);
    this.logo = "";
    this.titulo = "";
    this.vistaPagina_main_logo= "";
    this.vistaPagina_main_titulo = "";
    this.vistaPagina_color_background = "";
    this.vistaPagina_color_botones = "";
    this.vistaPagina_color_header = "";
    this.vistaPagina_color_subHeader = "";
    this.vistaPagina_color_texto = "";
    this.proyectoServices.crearProyecto();
    this.cdr.detectChanges();
    this.renderer.listen(this.inputRef.nativeElement, 'change', (event) => {
      this.cargarLogotipo(event);
    });
  }


  getService(){
    return this.mainService;
  }

  getProyectosServices(){
    return this.proyectoServices;
  }

  generarProyecto(){
    const pr : CrearProyectoDto = {
      Usuario: sessionStorage.getItem("Id")!,
      Nombre: this.nombreProyecto,
      Plantilla: this.proyectoServices.getPlantillaSeleccionada()?.Nombre!,
      Personalizacion: {
        Color_fondo: this.vistaPagina_color_background,
        Color_texto: this.vistaPagina_color_texto,
        Color_boton: this.vistaPagina_color_botones,
        Color_header: this.vistaPagina_color_header,
        Color_subHeader: this.vistaPagina_color_subHeader,
        Logo: this.logo,
        Titulo: this.vistaPagina_main_titulo
      },
      BaseDatosTienda: {
        Productos: this.proyectoServices.getListaProductosDb(),
        Categorias: this.proyectoServices.getListaCategoriaDb()
      },
    }
    console.log(pr);
    this.proyectoServices.generarProyecto(pr).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



}
