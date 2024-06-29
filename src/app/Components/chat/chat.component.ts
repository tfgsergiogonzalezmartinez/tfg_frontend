import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../../../../Interfaces/Chat/ChatMessage';
import { UserService } from '../../../../Services/User/User.service';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';
import { ChatUsuariosBuscados } from '../../../../Interfaces/Chat/ChatUsuariosBuscados';
import { BuscadorUsuariosComponent } from '../BuscadorUsuarios/BuscadorUsuarios.component';
import { ChatService } from '../../../../Services/Chat/Chat.service';

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
  private connection: HubConnection;

  constructor(private userService: UserService, private chatService: ChatService, private cdr: ChangeDetectorRef) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5059/WebChat?tipoComunicacion=${this.tipoComunicacion}&user=${sessionStorage.getItem('Id')}&token=${sessionStorage.getItem('Token')}`, {
        withCredentials: true
      })
      .build();

    this.connection.on("mensajePrivado", (message: ChatMessage) => this.recibirMensaje_privado(message));

  }

  ngOnInit(): void {
    this.connection.start()
      .then(() => {
        console.log('Connection Started');
        this.isConnectionEstablished = true;
      })
      .catch(error => {
        console.error('Connection Error: ', error);
        this.isConnectionEstablished = false;
      });
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
    this.connection.stop()
      .then(() => console.log('Connection Stopped'))
      .catch(error => console.error('Connection Stop Error: ', error));
  }

  private recibirMensaje_privado(message: ChatMessage) {
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

  public join(grupo: string) {
    this.connection.invoke('JoinGroup', grupo, this.user)
      .then(() => this.connected = true)
      .catch(err => console.error('Join Group Error: ', err));
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

