import { ChangeDetectorRef, Component, Input, OnInit, input } from '@angular/core';
import { MenuDesplegable } from '../../../../Interfaces/Header/menuDesplegable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() MenuDesplegables : MenuDesplegable[] = [
    {
      TituloPrincipal: "Home",
      Icono: "home",
      Ruta: "/main",
      Secciones: [
        {
          TituloPrincipal: "Components",
          Icono: "data_object",
          Ruta: "/main/components",
          Secciones: []
        }
      ]
    },
    {
      TituloPrincipal: "Pages",
      Icono: "newspaper",
      Ruta: "/pages",
      Secciones: []
    },
    {
      TituloPrincipal: "Editor",
      Icono: "edit",
      Ruta: "/editor",
      Secciones: []
    },
    {
      TituloPrincipal: "About",
      Icono: "help",
      Ruta: "/About",
      Secciones: []
    },

  ];




  constructor(private router : Router ,private cdr: ChangeDetectorRef ) { }

  goTo(ruta:string){
    this.router.navigate([ruta]);
  }

  ngOnInit() {
  }

}
