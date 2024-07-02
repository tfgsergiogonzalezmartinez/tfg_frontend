import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-ToggleMode',
  templateUrl: './ToggleMode.component.html',
  styleUrls: ['./ToggleMode.component.css']
})
export class ToggleModeComponent implements OnInit {
  private modo_Oscuro: boolean = false;
  private modo_Claro: boolean = true;


  constructor(private mainService : MainService) { }

  ngOnInit() {
  }

  getModoOscuro(){
    return this.modo_Oscuro;
  }
  getModoClaro(){
    return this.modo_Claro;
  }

  toggle(){
    this.modo_Oscuro = !this.modo_Oscuro;
    this.modo_Claro = !this.modo_Claro;
    this.mainService.toggleModo();
  }

}
