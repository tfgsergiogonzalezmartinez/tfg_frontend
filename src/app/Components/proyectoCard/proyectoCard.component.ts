import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-proyectoCard',
  templateUrl: './proyectoCard.component.html',
  styleUrls: ['./proyectoCard.component.css']
})
export class ProyectoCardComponent implements OnInit {
  plantilla : string = "tienda";

  constructor(private mainService : MainService) { }

  ngOnInit() {
  }


  getService(){
    return this.mainService;
  }

}
