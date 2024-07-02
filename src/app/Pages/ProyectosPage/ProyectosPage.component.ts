import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';

@Component({
  selector: 'app-ProyectosPage',
  templateUrl: './ProyectosPage.component.html',
  styleUrls: ['./ProyectosPage.component.css']
})
export class ProyectosPageComponent implements OnInit {
  isProyectoAbierto = false;
  isCrearProyecto = false;

  //Datos del nuevo proyecto:
  nombreProyecto : string = "";
  plantilla : string = "";
  datosProductos : string = "";
  datosCategorias : string = "";

  vistaPagina_main_logo : string = "";
  vistaPagina_main_titulo : string = "";
  vistaPagina_color_background : string = "";
  vistaPagina_color_botones : string = "";
  vistaPagina_color_header : string = "";
  vistaPagina_color_subMenu : string = "";
  vistaPagina_color_texto : string = "";

  constructor(private mainService : MainService, private proyectoServices : ProyectoService) { }

  ngOnInit() {
  }



  getService(){
    return this.mainService;
  }

  getProyectosServices(){
    return this.proyectoServices;
  }



}
