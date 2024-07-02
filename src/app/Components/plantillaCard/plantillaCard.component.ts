import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-plantillaCard',
  templateUrl: './plantillaCard.component.html',
  styleUrls: ['./plantillaCard.component.css']
})
export class PlantillaCardComponent implements OnInit {
  plantilla! : any;
  tipoPlantilla : string = "Tienda";
  constructor(private mainService : MainService) { }

  ngOnInit() {
  }

  getService(){
    return this.mainService;
  }

}
