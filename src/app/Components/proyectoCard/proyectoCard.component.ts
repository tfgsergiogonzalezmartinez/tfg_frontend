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
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.proyecto.Nombre}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error en la descarga:', error);
    });
  }

  eliminarProyecto() {
    this.proyectoService.eliminarProyecto(this.proyecto).subscribe({
      next: (data) => {
        this.actualizarProyectos.emit();
      },
      error: (error) => {
        console.error('Error al eliminar el proyecto:', error);
        this.actualizarProyectos.emit();
      }
    });
  }


  toggleOptions() {
    this.isOptions = !this.isOptions;
  }

}
