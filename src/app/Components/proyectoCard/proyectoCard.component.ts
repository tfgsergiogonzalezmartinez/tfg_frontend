import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';
import { ProyectoDto } from '../../../../dto/Proyecto/ProyectoDto';

@Component({
  selector: 'app-proyectoCard',
  templateUrl: './proyectoCard.component.html',
  styleUrls: ['./proyectoCard.component.css']
})
export class ProyectoCardComponent implements OnInit {
  @Input() proyecto! : ProyectoDto;
  plantilla : string = "tienda";

  constructor(private mainService : MainService, private proyectoService : ProyectoService) { }

  ngOnInit() {
  }


  getService(){
    return this.mainService;
  }

  getProyectoService(){
    return this.proyectoService;
  }

}
