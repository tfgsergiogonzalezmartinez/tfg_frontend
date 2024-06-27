import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../../../Services/Chat/Chat.service';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../../../../Interfaces/Chat/ChatMessage';
import { UserService } from '../../../../Services/User/User.service';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';
import { ChatUsuariosBuscados } from '../../../../Interfaces/Chat/ChatUsuariosBuscados';
import { BuscadorUsuariosComponent } from '../BuscadorUsuarios/BuscadorUsuarios.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('buscador') BuscadorComponent! : BuscadorUsuariosComponent;

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
    Mensaje: 'Bienvenido',
    Usuario: 'Sistema'
  },
  {
    Mensaje: 'Escribe un mensaje para comenzar',
    Usuario: 'Usuario'
  },];
  currentUser!: UserGetDto;
  currentImage: string = "";
  otroUsuarioChat!: ChatUsuariosBuscados;
  inputMensaje: string = "";
  private connection: HubConnection;

  constructor(private userService : UserService, private cdr : ChangeDetectorRef) {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5059/WebChat', {
        withCredentials: true
      })
      .build();

    this.connection.on("NewUser", message => this.newUser(message));
    this.connection.on("NewMessage", message => this.newMessage(message));
    this.connection.on("LeftUser", message => this.leftUser(message));
  }

  ngOnInit(): void {
    this.connection.start()
      .then(() => console.log('Connection Started'))
      .catch(error => console.error('Connection Error: ', error));

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

  public join(grupo: string) {
    this.connection.invoke('JoinGroup', grupo, this.user)
      .then(() => this.connected = true)
      .catch(err => console.error('Join Group Error: ', err));
  }

  public sendMessage() {
    const newMessage: ChatMessage = {
      Mensaje: this.message,
      Usuario: this.user,
      Grupo: this.group
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
    this.listaConversacion.push({ Usuario: 'Sistema', Mensaje: message });
  }

  private newMessage(message: ChatMessage) {
    console.log(message);
    this.listaConversacion.push(message);
  }

  private leftUser(message: string) {
    console.log();
    this.listaConversacion.push({ Usuario: 'Sistema', Mensaje: message });
  }

  getListUsuariosBuscados(){
    return this.listaUsuariosBuscados;
  }

  //!ASIGNO LA IMAGEN AQUI YA QUE SON METODOS ASYNCRONOS Y PUEDE QUE NO COMPLEMETEN TOTALMENTE SU EJECUCION y DEVUELVA LOS DATOS ANTES DE ASIGNARLOS.
  cargarFoto(user : UserGetDto, id : string) {
    this.userService.getFotoAvatar(id).subscribe({
      next: data => {
        this.listaUsuariosBuscados.push({User: user , Imagen: data.Imagen});
        console.log(data);
        return data.Imagen;
        // this.fotoUrl = data.imagen; // Asume que el backend devuelve { imagen: "data:image/jpeg;base64,..." }
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
  }


  addUsuarioChat(user : ChatUsuariosBuscados){
    this.listaUsuariosAbiertosChats.push(user);
    this.BuscadorComponent.mostrarBuscador = false;

  }

  setChatActivo(user : ChatUsuariosBuscados){
    // this.listaConversacion = [];
    this.otroUsuarioChat = user;
    this.BuscadorComponent.mostrarBuscador = false;
    // this.listaUsuariosAbiertosChats = [];
    // this.listaUsuariosAbiertosChats.push(user);
  }

  getCurrentID(){
    return sessionStorage.getItem('Id');
  }

  enviarMensaje(){
    const newMessage: ChatMessage = {
      Mensaje: this.inputMensaje,
      Usuario: sessionStorage.getItem('Id')!,
      Grupo: sessionStorage.getItem('Id') + "$" + this.otroUsuarioChat.User.Id
    };
    this.listaConversacion.push(newMessage);
    
    // this.connection.invoke('SendMessage', newMessage)
    //   .then(() => this.inputMensaje = '')
    //   .catch(err => console.error('Send Message Error: ', err));
  }
}

