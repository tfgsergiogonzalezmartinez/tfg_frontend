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
      TituloPrincipal: "Inicio",
      Icono: "home",
      Ruta: "/main",
      Rol: "all",
      Secciones: [
        {
          TituloPrincipal: "Components",
          Icono: "data_object",
          Ruta: "/main/components",
          Rol: "all",
          Secciones: []
        }
      ]
    },
    {
      TituloPrincipal: "Proyectos",
      Icono: "newspaper",
      Ruta: "/pages",
      Rol: "user",
      Secciones: []
    },
    {
      TituloPrincipal: "Administracion",
      Icono: "manage_accounts",
      Ruta: "/main/administration",
      Rol: "admin",
      Secciones: []
    },
    {
      TituloPrincipal: "About",
      Icono: "help",
      Ruta: "/About",
      Rol: "all",
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
