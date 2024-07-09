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
      TituloPrincipal: "Proyectos",
      Icono: "newspaper",
      Ruta: "/main/proyectos",
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
      TituloPrincipal: "Soporte",
      Icono: "contact_support",
      Ruta: "/main/soporte",
      Rol: "user",
      Secciones: []
    },
    {
      TituloPrincipal: "Documentacion",
      Icono: "library_books",
      Ruta: "/main/documentacion",
      Rol: "all",
      Secciones: []
    }


  ];




  constructor(private router : Router ,private cdr: ChangeDetectorRef ) { }

  goTo(ruta:string){
    this.router.navigate([ruta]);
  }

  ngOnInit() {
  }

}
