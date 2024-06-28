import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ChatComponent implements OnInit {
  @ViewChild('buscador') BuscadorComponent! : BuscadorUsuariosComponent;
  isConnectionEstablished: boolean = false;

  private listaUsuariosBuscados : ChatUsuariosBuscados[] = [];
  mostrarBuscador : boolean = false;
  UserBuscar: string = "";
  UsuariosBuscados: UserGetDto[] = [];
  listaUsuariosAbiertosChats: ChatUsuariosBuscados[] = [];
  isOpen = true;
  user = sessionStorage.getItem('Nombre')!;
  group = '';
  message = '';
  connected = false;
  listaConversacion: ChatMessage[] = [{
    mensaje: 'Bienvenido',
    usuario: 'Sistema'
  },
  {
    mensaje: 'Escribe un mensaje para comenzar',
    usuario: 'Usuario'
  },];
  currentUser!: UserGetDto;
  currentImage: string = "";
  otroUsuarioChat!: ChatUsuariosBuscados;
  inputMensaje: string = "";

  isConexionInciada = false;
  private connection: HubConnection;

  constructor(private userService : UserService, private chatService : ChatService, private cdr : ChangeDetectorRef) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5059/WebChat?user=${sessionStorage.getItem('Id')}`, {
        withCredentials: true
      })
      .build();

      this.connection.on("NewUser", message => this.newUser(message));
      this.connection.on("NewMessage", (message: ChatMessage, group: string) => this.newMessage(message, group));
      this.connection.on("LeftUser", message => this.leftUser(message));
      this.connection.on("JoinGroup", (group: string) => this.handleJoinGroup(group));
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
  }

  private recibirMensaje_privado(message: ChatMessage) {
    console.log('Mensaje directo recibido:', message);
    this.actualizarMensajesNoLeidos(message.usuario); //Actualizo los mensajes no leidos a partir de la primera vez.
    if (this.otroUsuarioChat && this.otroUsuarioChat.User.Id == message.usuario){
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
      next: data =>{
        this.cargarFoto(data, message.usuario);
      },
      error: error => {
        console.error("Error al obtener el usuario.", error);
      }
    });
    this.listaConversacion.push(message);

    this.cdr.detectChanges();
  }

  private handleJoinGroup(group: string) {
    this.join(group);
    this.isConexionInciada = true;
    this.group = group;
  }

  public join(grupo: string) {
    this.connection.invoke('JoinGroup', grupo, this.user)
      .then(() => this.connected = true)
      .catch(err => console.error('Join Group Error: ', err));
  }

  public sendMessage() {
    const newMessage: ChatMessage = {
      mensaje: this.message,
      usuario: this.user,
      grupo: this.group,
    };

    this.connection.invoke('SendMessage', newMessage)
      .then(() => this.message = '')
      .catch(err => console.error('Send Message Error: ', err));
  }

  public leave() {
    this.connection.invoke('LeaveGroup', this.group, this.user)
      .then(() => this.connected = false)
      .catch(err => console.error('Leave Group Error: ', err));
  }

  private newUser(message: string) {
    console.log(message);
    this.listaConversacion.push({ usuario: 'Sistema', mensaje: message });
  }

  private newMessage(message: ChatMessage, group: string) {
    console.log(message);

    // Si el grupo es diferente al actual, cambiar al nuevo grupo
    if (this.group !== group) {
      this.group = group;
      this.isConexionInciada = true;
    }

    // this.listaConversacion.push(message);
    this.cdr.detectChanges();  // Asegurar que los cambios se detecten
  }


  private leftUser(message: string) {
    console.log();
    this.listaConversacion.push({ usuario: 'Sistema', mensaje: message });
  }

  actualizarMensajesNoLeidos(idUsuario : string){
    for(const user of this.listaUsuariosAbiertosChats){
      if (user.User.Id == idUsuario){
        this.chatService.GetNumMensajesSinLeer(idUsuario, sessionStorage.getItem('Id')!).subscribe({
          next: data => {
            user.MensajesNoLeidos = data.MensajesNoLeidos;
          }
        });
        break;
      }
    }
  }

  getListUsuariosBuscados(){
    return this.listaUsuariosBuscados;
  }

  //!ASIGNO LA IMAGEN AQUI YA QUE SON METODOS ASYNCRONOS Y PUEDE QUE NO COMPLEMETEN TOTALMENTE SU EJECUCION y DEVUELVA LOS DATOS ANTES DE ASIGNARLOS.
  cargarFoto(user : UserGetDto, id : string) {
    this.userService.getFotoAvatar(id).subscribe({
      next: data => {
        if (this.listaUsuariosAbiertosChats.length > 0){
          for (const user of this.listaUsuariosAbiertosChats){
            if (user.User.Id == id) return;
          }
        }
        this.listaUsuariosAbiertosChats.push({User: user , Imagen: data.Imagen, MensajesNoLeidos: 0});
        this.actualizarMensajesNoLeidos(user.Id); //Actualizo los mensajes no leidos por primera vez
        console.log(data);
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
  }


  addUsuarioChat(user : ChatUsuariosBuscados){
    if (this.listaUsuariosAbiertosChats.length <= 0) this.listaUsuariosAbiertosChats.push(user);
    for( const userLista of this.listaUsuariosAbiertosChats){
      if (user.User.Id == userLista.User.Id) break;
      this.listaUsuariosAbiertosChats.push(user);
    }
    this.otroUsuarioChat = user;
    this.group = sessionStorage.getItem('Id') + "$" + user.User.Id;
    this.BuscadorComponent.mostrarBuscador = false;
    this.isConexionInciada = false; //Reinicio la conexion para que se vuelva a conectar con el nuevo chat tras el primer mensaje
  }

  setChatActivo(user : ChatUsuariosBuscados){
    // this.listaConversacion = [];
    this.otroUsuarioChat = user;
    this.group = sessionStorage.getItem('Id') + "$" + user.User.Id;
    this.chatService.LeerChat(user.User.Id, sessionStorage.getItem('Id')!).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
    this.BuscadorComponent.mostrarBuscador = false;
    this.isConexionInciada = false; //Reinicio la conexion para que se vuelva a conectar con el nuevo chat tras el primer mensaje
    // this.listaUsuariosAbiertosChats = [];
    // this.listaUsuariosAbiertosChats.push(user);
  }

  getCurrentID(){
    return sessionStorage.getItem('Id');
  }

  public enviarMensaje() {
    const newMessage: ChatMessage = {
      mensaje: this.inputMensaje,
      usuario: sessionStorage.getItem('Id')!,
      grupo: sessionStorage.getItem('Id') + "$" + this.otroUsuarioChat.User.Id,
      destinatario: this.otroUsuarioChat.User.Id // Asegúrate de tener el destinatario en el mensaje
    };

    if (!this.isConexionInciada) {
      this.group = newMessage.grupo!;
      this.join(newMessage.grupo!)!;
      this.isConexionInciada = true;
    }

    this.connection.invoke('SendMessage', newMessage)
      .then(() => {
        this.listaConversacion.push(newMessage);
        this.inputMensaje = '';
      })
      .catch(err => console.error('Send Message Error: ', err));
  }
}

