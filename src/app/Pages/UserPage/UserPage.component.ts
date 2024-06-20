import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';
import { UserCambiarPassword } from '../../../../dto/UserDto/UserCambiarPassword';
import { MainService } from '../../../../Services/Main/Main.service';

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

  passwordAntigua: string = "";
  PasswordNueva1: string = "";
  PasswordNueva2: string = "";

  isCambiarPassword: boolean = false;

  constructor(private userService : UserService, private mainService : MainService) { }

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
    const userCambiarPassword : UserCambiarPassword = {
      Email: sessionStorage.getItem("Email") || "",
      PasswordAntigua: this.passwordAntigua,
      PasswordNueva1: this.PasswordNueva1,
      PasswordNueva2: this.PasswordNueva2
    }
    this.userService.cambiarPassword(userCambiarPassword).subscribe({
      next: data => {
        //viewContainerRef y que saque un toast
        console.log("Contraseña cambiada con éxito");
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getService(){
    return this.mainService;
  }



}
