import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { MenuDesplegable } from '../../../../Interfaces/Header/menuDesplegable';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-HeaderDesplegable',
  templateUrl: './HeaderDesplegable.component.html',
  styleUrls: ['./HeaderDesplegable.component.css']
})
export class HeaderDesplegableComponent implements OnInit {
  @Input() MenuDesplegable! : MenuDesplegable;
  @Output() submenusEmiter : EventEmitter<MenuDesplegable[]> = new EventEmitter<MenuDesplegable[]>();
  open : boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggle(){
    this.open = !this.open;
  }
  setOpen(estado:boolean){
    this.open = estado;
  }
  goTo(ruta:string){
    this.router.navigate([ruta]);
  }

}
