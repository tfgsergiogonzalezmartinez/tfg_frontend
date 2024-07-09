import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';
import { UserCambiarPassword } from '../../../../dto/UserDto/UserCambiarPassword';
import { MainService } from '../../../../Services/Main/Main.service';
import { ImagenDto } from '../../../../dto/UserDto/ImagenDto';

@Component({
  selector: 'app-UserPage',
  templateUrl: './UserPage.component.html',
  styleUrls: ['./UserPage.component.css']
})
export class UserPageComponent implements OnInit {
  @ViewChild('CargarImagenInput') cargarImagenInput! : ElementRef;
  archivoSeleccionado: File | null = null;
  fotoUrl: string | null = null;
  userId: string = sessionStorage.getItem("Id") || "";
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
    this.cargarFoto();
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
        this.mainService.setIcono("check");
        this.mainService.setMensaje("Contraseña cambiada con exito.");
        this.mainService.activarMensaje();
        this.isCambiarPassword = false;
      },
      error: error => {
        this.mainService.setIcono("error");
        this.mainService.setMensaje("Error al cambiar la contraseña");
        this.mainService.activarMensaje();
      }
    });
  }


  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Imagen = reader.result as string;
        this.subirFoto(base64Imagen);
      };
      reader.readAsDataURL(archivo);
    }
}

  subirFoto(base64Imagen: string) {
    this.userService.subirFotoAvatar(this.userId, base64Imagen).subscribe({
      next: data => {
        this.mainService.setIcono("check");
        this.mainService.setMensaje("Foto de perfil subida con exito.");
        this.mainService.activarMensaje();
        this.cargarFoto(); // Descargar y mostrar la foto recién subida

      },
      error: error => {
        this.mainService.setIcono("error");
        this.mainService.setMensaje("Error al subir la foto de perfil.");
        this.mainService.activarMensaje();
      }
    });
  }

  cargarFoto() {
    this.userService.getFotoAvatar(this.userId).subscribe({
      next: data => {
        this.fotoUrl = data.Imagen;

        // this.fotoUrl = data.imagen; // Asume que el backend devuelve { imagen: "data:image/jpeg;base64,..." }
      },
      error: error => {
        this.fotoUrl = "assets/avatar/user_placeholder.png";
        console.error("Error al descargar la foto", error);
      }
    });
  }


  activarInput(){
    this.cargarImagenInput.nativeElement.click();
  }

  getService(){
    return this.mainService;
  }



}
