import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, output } from '@angular/core';
import { ChatUsuariosBuscados } from '../../../../Interfaces/Chat/ChatUsuariosBuscados';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';
import { UserService } from '../../../../Services/User/User.service';

@Component({
  selector: 'app-BuscadorUsuarios',
  templateUrl: './BuscadorUsuarios.component.html',
  styleUrls: ['./BuscadorUsuarios.component.css']
})
export class BuscadorUsuariosComponent implements OnInit {
  @ViewChild('Buscador') Buscador! : ElementRef;
  @Output() usuarioEmitter : EventEmitter<ChatUsuariosBuscados> = new EventEmitter<ChatUsuariosBuscados>();
  clickFuera! : (event: any) => void;
  private listaUsuariosBuscados : ChatUsuariosBuscados[] = [];
  mostrarBuscador : boolean = false;
  UserBuscar: string = "";
  UsuariosBuscados: UserGetDto[] = [];

  constructor(private userService : UserService , private renderer2: Renderer2) {
    this.inicializarListeners();
  }

  inicializarListeners(){
    this.clickFuera = this.renderer2.listen('window', 'click', (event: any) => {
      this.ClickFueraBuscador(event);
    });
  }

  ngOnInit() {
  }
  getListUsuariosBuscados(){
    return this.listaUsuariosBuscados;
  }

  buscarUsuarios(){
    if (this.UserBuscar == ""){
      this.listaUsuariosBuscados = [];
      return;
    }
    if (this.listaUsuariosBuscados.length>0) this.listaUsuariosBuscados = [];
    this.mostrarBuscador = true;
    this.inicializarListeners();
    this.userService.getUsuariosCoincidentesByNombre(this.UserBuscar).subscribe({
      next: data => {
        this.UsuariosBuscados = data;
          for (const user of data){
            if (this.isOtroUsuario(user)){
              this.cargarFoto(user ,user.Id);
            }
          }
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  isOtroUsuario(user : UserGetDto){
    if (user.Id != sessionStorage.getItem('Id')) return true;
    return false;
  }

  //!ASIGNO LA IMAGEN AQUI YA QUE SON METODOS ASYNCRONOS Y PUEDE QUE NO COMPLEMETEN TOTALMENTE SU EJECUCION y DEVUELVA LOS DATOS ANTES DE ASIGNARLOS.
  cargarFoto(user : UserGetDto, id : string) {
    this.userService.getFotoAvatar(id).subscribe({
      next: data => {
        this.listaUsuariosBuscados.push({User: user , Imagen: data.Imagen, MensajesNoLeidos: 0});
        console.log(data);
        // this.fotoUrl = data.imagen; // Asume que el backend devuelve { imagen: "data:image/jpeg;base64,..." }
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
  }

  ClickFueraBuscador(event: any){
    if (this.mostrarBuscador && !this.Buscador.nativeElement.contains(event.target)){
      this.clickFuera(event);
      this.mostrarBuscador = false;
    }
  }

  ClickUsuario(userChat : ChatUsuariosBuscados){
    this.UserBuscar = "";
    this.usuarioEmitter.emit(userChat);
  }
}
