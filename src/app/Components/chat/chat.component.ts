import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../../../../Interfaces/Chat/ChatMessage';
import { UserService } from '../../../../Services/User/User.service';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';
import { ChatUsuariosBuscados } from '../../../../Interfaces/Chat/ChatUsuariosBuscados';
import { BuscadorUsuariosComponent } from '../BuscadorUsuarios/BuscadorUsuarios.component';
import { ChatService } from '../../../../Services/Chat/Chat.service';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('buscador') buscadorComponent!: BuscadorUsuariosComponent;
  @ViewChild('chat') chatHtml!: ElementRef;
  isConnectionEstablished: boolean = false;

  private listaUsuariosBuscados: ChatUsuariosBuscados[] = [];
  tipoComunicacion: string = "Chat";
  mostrarBuscador: boolean = false;
  UserBuscar: string = "";
  UsuariosBuscados: UserGetDto[] = [];
  listaUsuariosAbiertosChats: ChatUsuariosBuscados[] = [];
  isOpen = false;
  user = sessionStorage.getItem('Nombre')!;
  message = '';
  connected = false;
  listaConversacion: ChatMessage[] = [];
  currentUser!: UserGetDto;
  currentImage: string = "";
  otroUsuarioChat!: ChatUsuariosBuscados | null;
  inputMensaje: string = "";

  isConexionInciada = false;

  constructor(private userService: UserService, private chatService: ChatService,private mainService : MainService, private cdr: ChangeDetectorRef) {
    this.chatService.iniciarConexion();
    this.chatService.getHubConnection().on("mensajePrivadoChat", (message: ChatMessage) => this.recibirMensaje_privado(message));

  }


  abrirChatHtml(){
    this.isOpen = true;
  }

  cerrarChatHtml(){
    this.isOpen = false;
    this.otroUsuarioChat = null;
  }
  ngOnInit(): void {

    this.userService.getFotoAvatar(sessionStorage.getItem('Id')!).subscribe({
      next: data => {
        this.currentImage = data.Imagen;
        console.log(data);
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });

    this.chatService.GetChatsAbiertos(sessionStorage.getItem('Id')!).subscribe({
      next: data => {
        for (const chat of data) {
          for (const user of chat.UserIds) {
            if (user != sessionStorage.getItem('Id')) {  //si es distinto al usuario actual, cargamos su foto y sus mensajes no leidos
              this.userService.GetById(user).subscribe({
                next: data => {
                  this.cargarFoto(data, user);
                },
                error: error => {
                  console.error("Error al obtener el usuario.", error);
                }
              });
            }
          }
        }
      },
      error: error => {
        console.error("Error al obtener los chats abiertos", error);
      }
    });
  }

  ngOnDestroy(): void {
    this.chatService.getHubConnection().stop()
      .then(() => console.log('Connection Stopped'))
      .catch(error => console.error('Connection Stop Error: ', error));
  }

  private recibirMensaje_privado(message: ChatMessage) {
    if(message.usuario != this.otroUsuarioChat?.User.Id){
      this.userService.GetById(message.usuario).subscribe({
        next: data => {
          this.mainService.setIcono("sms");
          this.mainService.setMensaje("Nuevo mensaje de " + data.Nombre + " " + data.Apellido1 + " " + data.Apellido2);
          this.mainService.activarMensaje();
          this.actualizarMensajesNoLeidos(message.usuario);
        },
        error: error => {
          console.error("Error al obtener el usuario.", error);
        }
      });
    }
    console.log('Mensaje directo recibido:', message);
    this.scrollHastaAbajo();
    this.actualizarMensajesNoLeidos(message.usuario); //Actualizo los mensajes no leidos a partir de la primera vez.
    if (this.otroUsuarioChat && this.otroUsuarioChat.User.Id == message.usuario) {
      this.chatService.LeerChat(message.usuario, sessionStorage.getItem('Id')!).subscribe({
        next: data => {
          this.actualizarMensajesNoLeidos(message.usuario); //Actualizo los mensajes a 0 en caso de que esten leidos
          console.log(data);
        },
        error: error => {
          console.error("Error al descargar la foto", error);
        }
      });
    }
    this.userService.GetById(message.usuario).subscribe({
      next: data => {
        this.cargarFoto(data, message.usuario);
      },
      error: error => {
        console.error("Error al obtener el usuario.", error);
      }
    });
    //en caso de que no sea el usuario con el que tiene la conver abierta, saldra de la funcion, sino, añadira el mensaje.
    if (this.otroUsuarioChat && this.otroUsuarioChat.User.Id != message.usuario) return
    this.listaConversacion.push(message);

  }

  actualizarMensajesNoLeidos(idUsuario: string) {
    for (const user of this.listaUsuariosAbiertosChats) {
      if (user.User.Id == idUsuario) {
        this.chatService.GetNumMensajesSinLeer(idUsuario, sessionStorage.getItem('Id')!).subscribe({
          next: data => {
            user.MensajesNoLeidos = data.MensajesNoLeidos;
            this.scrollHastaAbajo();
          }
        });
        break;
      }
    }
  }

  getListUsuariosBuscados() {
    return this.listaUsuariosBuscados;
  }

  //!ASIGNO LA IMAGEN AQUI YA QUE SON METODOS ASYNCRONOS Y PUEDE QUE NO COMPLEMETEN TOTALMENTE SU EJECUCION y DEVUELVA LOS DATOS ANTES DE ASIGNARLOS.
  cargarFoto(user: UserGetDto, id: string) {
    this.userService.getFotoAvatar(id).subscribe({
      next: data => {
        if (this.listaUsuariosAbiertosChats.length > 0) {
          for (const user of this.listaUsuariosAbiertosChats) {
            if (user.User.Id == id) return;
          }
        }
        const chatUsuario: ChatUsuariosBuscados = { User: user, Imagen: data.Imagen, MensajesNoLeidos: 0 };
        this.abrirChat(chatUsuario);
        console.log(data);
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
  }


  addUsuarioChat(user: ChatUsuariosBuscados) {
    this.cargarMensajesBBDD(user);
    if (this.listaUsuariosAbiertosChats.length <= 0) this.abrirChat(user);
    for (const userLista of this.listaUsuariosAbiertosChats) {
      if (user.User.Id == userLista.User.Id) break;
      this.abrirChat(user);
    }
    this.scrollHastaAbajo();
    this.otroUsuarioChat = user;
    this.buscadorComponent.mostrarBuscador = false;
    this.isConexionInciada = false; //Reinicio la conexion para que se vuelva a conectar con el nuevo chat tras el primer mensaje
  }

  setChatActivo(user: ChatUsuariosBuscados) {
    this.cargarMensajesBBDD(user);
    this.otroUsuarioChat = user;
    this.chatService.LeerChat(user.User.Id, sessionStorage.getItem('Id')!).subscribe({
      next: data => {
        this.actualizarMensajesNoLeidos(user.User.Id);
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
    this.scrollHastaAbajo();
    this.buscadorComponent.mostrarBuscador = false;
    this.isConexionInciada = false;
  }

  getCurrentID() {
    return sessionStorage.getItem('Id');
  }

  public enviarMensaje() {
    if (this.inputMensaje == '') return;
    const newMessage: ChatMessage = {
      mensaje: this.inputMensaje,
      usuario: sessionStorage.getItem('Id')!,
      destinatario: this.otroUsuarioChat!.User.Id
    };


    this.chatService.getHubConnection().invoke('onEnviarMensajeDirectoChat', newMessage)
      .then(() => {
        this.listaConversacion.push(newMessage);
        this.inputMensaje = '';
        this.scrollHastaAbajo();
      })
      .catch(err => console.error('Send Message Error: ', err));
  }

  cerrarChat(user: ChatUsuariosBuscados) {
    this.chatService.CerrarChat(sessionStorage.getItem('Id')!, user.User.Id).subscribe({
      next: data => {
        this.listaUsuariosAbiertosChats = this.listaUsuariosAbiertosChats.filter(x => x.User.Id != user.User.Id);
        this.listaConversacion = [];
        this.otroUsuarioChat = null;
      }
    });
  }

  cargarMensajesBBDD(user: ChatUsuariosBuscados) {
    this.listaConversacion = [];
    this.chatService.GetByUsers(sessionStorage.getItem("Id")!, user.User.Id).subscribe({
      next: data => {
        for (const message of data.Mensajes) {
          const msg: ChatMessage = { mensaje: message.Msg, usuario: message.UserId };
          this.listaConversacion.push(msg);
          // this.scrollHastaAbajo();
        }
        this.scrollHastaAbajo();
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
  }


  abrirChat(user: ChatUsuariosBuscados) {
    this.chatService.AbrirChat(sessionStorage.getItem('Id')!, user.User.Id).subscribe({
      next: data => {
        this.listaUsuariosAbiertosChats.push(user);
        this.actualizarMensajesNoLeidos(user.User.Id);
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
  }

  scrollHastaAbajo() {
    this.cdr.detectChanges();
    this.chatHtml.nativeElement.scrollTop = this.chatHtml.nativeElement.scrollHeight;
  }
}

