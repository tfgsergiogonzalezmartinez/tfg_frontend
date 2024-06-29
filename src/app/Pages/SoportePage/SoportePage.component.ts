import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';
import { MainService } from '../../../../Services/Main/Main.service';
import { ChatUsuariosBuscados } from '../../../../Interfaces/Chat/ChatUsuariosBuscados';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';
import { SoporteService } from '../../../../Services/Soporte/Soporte.service';
import { ChatMessage } from '../../../../Interfaces/Chat/ChatMessage';
import { PeticionSoporteGetDto } from '../../../../dto/SoporteDto/PeticionSoporteGetDto';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-SoportePage',
  templateUrl: './SoportePage.component.html',
  styleUrls: ['./SoportePage.component.css']
})
export class SoportePageComponent implements OnInit {
  @ViewChild('chat') chatHtml!: ElementRef;
  tipoComunicacion: string = "Soporte";
  private connection!: HubConnection;
  listaPeticiones : ChatUsuariosBuscados[] = [];
  otroUsuarioChat! : ChatUsuariosBuscados;
  listaConversacion: ChatMessage[] = [];
  currentImage: string = "";
  inputMensaje: string = "";


  constructor(private userService : UserService, private mainService : MainService,
    private soporteService : SoporteService, private cdr : ChangeDetectorRef ) { }

  ngOnInit() {

    this.cargarPeticiones();
    this.CargarFotoUsuario(sessionStorage.getItem('Id')!);

  }

  iniciarChat(){
    this.connection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5059/WebChat?tipoComunicacion=${this.tipoComunicacion}&user=${sessionStorage.getItem('Id')}&token=${sessionStorage.getItem('Token')}`, {
        withCredentials: true
      })
      .build();

    this.connection.on("mensajePrivado", (message: ChatMessage) => this.recibirMensaje_privado(message));
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
    for (const mensaje of this.otroUsuarioChat.Peticion!.Mensajes){
      this.listaConversacion.push({
        mensaje: mensaje.Msg,
        usuario: mensaje.UserId,
      });
    }

  }

  enviarMensaje() {
    const newMessage: ChatMessage = {
      mensaje: this.inputMensaje,
      usuario: sessionStorage.getItem('Id')!,
      grupo: this.tipoComunicacion,
      destinatario: this.otroUsuarioChat!.User.Id
    };


    this.connection.invoke('onEnviarMensajeDirecto', newMessage)
      .then(() => {
        this.listaConversacion.push(newMessage);
        this.inputMensaje = '';
        this.scrollHastaAbajo();
      })
      .catch(err => console.error('Send Message Error: ', err));
  }


}
