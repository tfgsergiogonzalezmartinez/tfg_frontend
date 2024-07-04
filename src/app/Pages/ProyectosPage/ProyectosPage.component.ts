import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';
import { PlantillaDto } from '../../../../dto/Plantillas/PlantillaDto';
import { PlantillaService } from '../../../../Services/Plantilla/Plantilla.service';
import { ProyectoDto } from '../../../../dto/Proyecto/ProyectoDto';
import { CrearProyectoDto } from '../../../../dto/Plantillas/CrearProyectoDto';
import { ColoresService } from '../../../../Services/Colores/Colores.service';

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
  vistaPagina_color_background_light : string = "";
  vistaPagina_color_background_dark : string = "";

  vistaPagina_color_items : string = "";
  vistaPagina_color_items_light : string = "";
  vistaPagina_color_items_dark : string = "";

  vistaPagina_color_botones : string = "";
  vistaPagina_color_botones_light : string = "";
  vistaPagina_color_botones_dark : string = "";

  vistaPagina_color_header : string = "";
  vistaPagina_color_header_light : string = "";
  vistaPagina_color_header_dark : string = "";

  vistaPagina_color_subHeader : string = "";
  vistaPagina_color_subHeader_light : string = "";
  vistaPagina_color_subHeader_dark : string = "";

  vistaPagina_color_texto : string = "";
  vistaPagina_color_texto_light : string = "";
  vistaPagina_color_texto_dark : string = "";

  logo : string = "";
  titulo : string = "";

  isLogotipoCargado : boolean = false;



  constructor(private mainService : MainService, private coloresService : ColoresService,
    private cdr : ChangeDetectorRef, private proyectoServices : ProyectoService,
    private renderer: Renderer2, private plantillaService : PlantillaService) { }

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
    this.vistaPagina_color_background_light = "";
    this.vistaPagina_color_background_dark = "";
    this.vistaPagina_color_botones = "";
    this.vistaPagina_color_botones_light = "";
    this.vistaPagina_color_botones_dark = "";
    this.vistaPagina_color_header = "";
    this.vistaPagina_color_header_light = "";
    this.vistaPagina_color_header_dark = "";
    this.vistaPagina_color_subHeader = "";
    this.vistaPagina_color_subHeader_light = "";
    this.vistaPagina_color_subHeader_dark = "";
    this.vistaPagina_color_texto = "";
    this.vistaPagina_color_texto_light = "";
    this.vistaPagina_color_texto_dark = "";

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
    this.generarColores();

    const pr : CrearProyectoDto = {
      Usuario: sessionStorage.getItem("Id")!,
      Nombre: this.nombreProyecto,
      Plantilla: this.proyectoServices.getPlantillaSeleccionada()?.Nombre!,
      Personalizacion: {
        Color_backgound: this.vistaPagina_color_background,
        Color_backgound_light: this.vistaPagina_color_background_light,
        Color_backgound_dark: this.vistaPagina_color_background_dark,
        Color_items: this.vistaPagina_color_items,
        Color_items_light: this.vistaPagina_color_items_light,
        Color_items_dark: this.vistaPagina_color_items_dark,
        Color_texto: this.vistaPagina_color_texto,
        Color_texto_light: this.vistaPagina_color_texto_light,
        Color_texto_dark: this.vistaPagina_color_texto_dark,
        Color_boton: this.vistaPagina_color_botones,
        Color_boton_light: this.vistaPagina_color_botones_light,
        Color_boton_dark: this.vistaPagina_color_botones_dark,
        Color_header: this.vistaPagina_color_header,
        Color_header_light: this.vistaPagina_color_header_light,
        Color_header_dark: this.vistaPagina_color_header_dark,
        Color_subHeader: this.vistaPagina_color_subHeader,
        Color_subHeader_light: this.vistaPagina_color_subHeader_light,
        Color_subHeader_dark: this.vistaPagina_color_subHeader_dark,
        Logo: this.logo,
        Titulo: this.vistaPagina_main_titulo
      },
      BaseDatosTienda: {
        Productos: this.proyectoServices.getListaProductosDb(),
        Categorias: this.proyectoServices.getListaCategoriaDb()
      },
    }








    console.log(pr);
    this.proyectoServices.generarProyecto(pr).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pr.Nombre}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, error => {
      console.error('Error al generar el proyecto:', error);
    });
  }

  private generarColores() {
    const { colorMasClaro, colorMasOscuro } = this.coloresService.generarColores(this.vistaPagina_color_background);
    this.vistaPagina_color_background_light = colorMasClaro;
    this.vistaPagina_color_background_dark = colorMasOscuro;

    const { colorMasClaro: colorMasClaroItems, colorMasOscuro: colorMasOscuroItems } = this.coloresService.generarColores(this.vistaPagina_color_items);
    this.vistaPagina_color_items_light = colorMasClaroItems;
    this.vistaPagina_color_items_dark = colorMasOscuroItems;

    const { colorMasClaro: colorMasClaroBotones, colorMasOscuro: colorMasOscuroBotones } = this.coloresService.generarColores(this.vistaPagina_color_botones);
    this.vistaPagina_color_botones_light = colorMasClaroBotones;
    this.vistaPagina_color_botones_dark = colorMasOscuroBotones;

    const { colorMasClaro: colorMasClaroHeader, colorMasOscuro: colorMasOscuroHeader } = this.coloresService.generarColores(this.vistaPagina_color_header);
    this.vistaPagina_color_header_light = colorMasClaroHeader;
    this.vistaPagina_color_header_dark = colorMasOscuroHeader;

    const { colorMasClaro: colorMasClaroSubHeader, colorMasOscuro: colorMasOscuroSubHeader } = this.coloresService.generarColores(this.vistaPagina_color_subHeader);
    this.vistaPagina_color_subHeader_light = colorMasClaroSubHeader;
    this.vistaPagina_color_subHeader_dark = colorMasOscuroSubHeader;

    const { colorMasClaro: colorMasClaroTexto, colorMasOscuro: colorMasOscuroTexto } = this.coloresService.generarColores(this.vistaPagina_color_texto);
    this.vistaPagina_color_texto_light = colorMasClaroTexto;
    this.vistaPagina_color_texto_dark = colorMasOscuroTexto
  }




}
