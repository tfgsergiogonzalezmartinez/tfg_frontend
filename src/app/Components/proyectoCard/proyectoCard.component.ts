import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';
import { ProyectoDto } from '../../../../dto/Proyecto/ProyectoDto';

@Component({
  selector: 'app-proyectoCard',
  templateUrl: './proyectoCard.component.html',
  styleUrls: ['./proyectoCard.component.css']
})
export class ProyectoCardComponent implements OnInit {
  @Input() proyecto!: ProyectoDto;
  @Output() actualizarProyectos : EventEmitter<null> = new EventEmitter();
  plantilla: string = "tienda";
  isOptions: boolean = false;


  constructor(private mainService: MainService, private proyectoService: ProyectoService) { }

  ngOnInit() {
  }


  getService() {
    return this.mainService;
  }

  getProyectoService() {
    return this.proyectoService;
  }

  descargarProyecto() {

    this.proyectoService.descargarProyecto(sessionStorage.getItem('Id')!, this.proyecto.Nombre).subscribe(blob => {
      this.mainService.setIcono("check");
      this.mainService.setMensaje("Decargando proyecto...");
      this.mainService.activarMensaje();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.proyecto.Nombre}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      this.mainService.setIcono("error");
      this.mainService.setMensaje("Error al descargar el proyecto.");
      this.mainService.activarMensaje();
    });
  }

  eliminarProyecto() {
    this.proyectoService.eliminarProyecto(this.proyecto).subscribe({
      next: (data) => {
        this.mainService.setIcono("check");
        this.mainService.setMensaje("Proyecto eliminado con exito.");
        this.mainService.activarMensaje();
        this.actualizarProyectos.emit();
      },
      error: (error) => {
        this.mainService.setIcono("error");
        this.mainService.setMensaje("Error al eliminar el proyecto.");
        this.mainService.activarMensaje();
        this.actualizarProyectos.emit();
      }
    });
  }


  toggleOptions() {
    this.isOptions = !this.isOptions;
  }

}
