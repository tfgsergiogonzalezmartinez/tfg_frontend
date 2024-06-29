import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';
import { MainService } from '../../../../Services/Main/Main.service';
import { ChatUsuariosBuscados } from '../../../../Interfaces/Chat/ChatUsuariosBuscados';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';
import { SoporteService } from '../../../../Services/Soporte/Soporte.service';
import { ChatMessage } from '../../../../Interfaces/Chat/ChatMessage';
import { PeticionSoporteGetDto } from '../../../../dto/SoporteDto/PeticionSoporteGetDto';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatService } from '../../../../Services/Chat/Chat.service';

@Component({
  selector: 'app-SoportePage',
  templateUrl: './SoportePage.component.html',
  styleUrls: ['./SoportePage.component.css']
})
export class SoportePageComponent implements OnInit {
  @ViewChild('chat') chatHtml!: ElementRef;
  tipoComunicacion: string = "Soporte";
  listaPeticiones : ChatUsuariosBuscados[] = [];
  otroUsuarioChat! : ChatUsuariosBuscados;
  listaConversacion: ChatMessage[] = [];
  currentImage: string = "";
  inputMensaje: string = "";


  constructor(private userService : UserService, private mainService : MainService,
    private soporteService : SoporteService, private chatService : ChatService, private cdr : ChangeDetectorRef ) { }

  ngOnInit() {
    this.iniciarConexionSoporte();
    this.cargarPeticiones();
    this.CargarFotoUsuario(sessionStorage.getItem('Id')!);

  }

  iniciarConexionSoporte(){
    this.chatService.getHubConnection().on("mensajePrivadoSoporte", (message: ChatMessage) => this.recibirMensaje_privado(message));
  }

  private recibirMensaje_privado(message: ChatMessage) {
    console.log('Mensaje directo recibido:', message);
    this.scrollHastaAbajo();
    if (this.otroUsuarioChat && this.otroUsuarioChat.User.Id != message.usuario) return
    this.listaConversacion.push(message);
  }

  scrollHastaAbajo() {
    this.cdr.detectChanges();
    this.chatHtml.nativeElement.scrollTop = this.chatHtml.nativeElement.scrollHeight;
  }


  CargarFotoUsuario(idUsuario: string){
    this.userService.getFotoAvatar(idUsuario).subscribe({
      next: data => {
        this.currentImage = data.Imagen;
      },
      error: error => {
        console.log(error);
      }
    });
  }



  getUserService(){
    return this.userService;
  }
  getService(){
    return this.mainService;
  }

  cargarPeticiones(){
    this.soporteService.GetPeticionesAbiertas().subscribe({
      next: data => {
        for (const peticion of data){
          this.cargarUsuario(peticion);
        }

      },
      error: error => {
        console.log(error);
      }

    });

  }

  cargarUsuario(peticion : PeticionSoporteGetDto) {
    this.userService.GetById(peticion.UsuarioPeticionario).subscribe({
      next: user => {
        const userdto : UserGetDto = user;
        this.userService.getFotoAvatar(user.Id).subscribe({
          next: data => {
            const UserBuscado : ChatUsuariosBuscados = {
              User: userdto,
              Imagen: data.Imagen,
              MensajesNoLeidos: 0,
              Peticion: peticion
            };
            this.listaPeticiones.push(UserBuscado);
            console.log(this.listaPeticiones);
          },
          error: error => {
            console.log(error);
          }
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getCurrentID(){
    return sessionStorage.getItem('Id');
  }

  seleccionarConversacion(user: ChatUsuariosBuscados){

    this.otroUsuarioChat = user;
    this.listaConversacion = [];
    this.soporteService.GetById(this.otroUsuarioChat.Peticion!.Id).subscribe({
      next : data =>{
        this.otroUsuarioChat.Peticion = data;
        for (const mensaje of this.otroUsuarioChat.Peticion!.Mensajes){
          this.listaConversacion.push({
            mensaje: mensaje.Msg,
            usuario: mensaje.UserId,
          });
        }
      },
      error : error =>{
        console.log(error);
      }
    });


  }

  enviarMensaje() {
    const newMessage: ChatMessage = {
      mensaje: this.inputMensaje,
      usuario: sessionStorage.getItem('Id')!,
      destinatario: this.otroUsuarioChat!.User.Id
    };

    this.chatService.getHubConnection().invoke('onEnviarMensajeDirectoSoporte', this.otroUsuarioChat.Peticion?.Id, newMessage)
      .then(() => {
        this.listaConversacion.push(newMessage);
        this.inputMensaje = '';
        this.scrollHastaAbajo();
      })
      .catch(err => console.error('Send Message Error: ', err));
  }


}
