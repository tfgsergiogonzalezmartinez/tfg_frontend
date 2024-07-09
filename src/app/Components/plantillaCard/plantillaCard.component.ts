import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';
import { PlantillaDto } from '../../../../dto/Plantillas/PlantillaDto';

@Component({
  selector: 'app-plantillaCard',
  templateUrl: './plantillaCard.component.html',
  styleUrls: ['./plantillaCard.component.css']
})
export class PlantillaCardComponent implements OnInit {
  @Input() plantilla! : PlantillaDto;
  constructor(private mainService : MainService,private proyectoService : ProyectoService) { }

  ngOnInit() {
  }

  getService(){
    return this.mainService;
  }

  setPlantillaSeleccionada(){
    this.proyectoService.setPlantillaSeleccionada(this.plantilla);
  }

}
