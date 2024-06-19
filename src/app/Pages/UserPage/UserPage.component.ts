import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-UserPage',
  templateUrl: './UserPage.component.html',
  styleUrls: ['./UserPage.component.css']
})
export class UserPageComponent implements OnInit {
  Nombre: string = "";
  Apellido1: string = "";
  Apellido2: string = "";
  Email: string = "";


  Password: string = "";
  PasswordRepeticion: string = "";

  isCambiarPassword: boolean = false;

  constructor() { }

  ngOnInit() {
    this.Nombre = sessionStorage.getItem("Nombre") || "";
    this.Apellido1 = sessionStorage.getItem("Apellido1") || "";
    this.Apellido2 = sessionStorage.getItem("Apellido2") || "";
    this.Email = sessionStorage.getItem("Email") || "";
  }


  activarCambioDePassword(){
    this.isCambiarPassword = true;
  }
  cambiarPassword(){
    //TODO servicio
  }



}
