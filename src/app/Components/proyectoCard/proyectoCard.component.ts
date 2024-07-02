import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { ProyectoService } from '../../../../Services/Proyecto/Proyecto.service';

@Component({
  selector: 'app-proyectoCard',
  templateUrl: './proyectoCard.component.html',
  styleUrls: ['./proyectoCard.component.css']
})
export class ProyectoCardComponent implements OnInit {
  proyecto! : any;
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
