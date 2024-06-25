import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../Services/Chat/Chat.service';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../../../../Interfaces/Chat/ChatMessage';
import { UserService } from '../../../../Services/User/User.service';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  UserBuscar: string = "";
  UsuariosBuscados: UserGetDto[] = [];
  isOpen = true;
  user = sessionStorage.getItem('Nombre')!;
  group = '';
  message = '';
  connected = false;
  conversation: ChatMessage[] = [{
    Mensaje: 'Bienvenido',
    Usuario: 'Sistema'
  }];

  private connection: HubConnection;

  constructor(private userService : UserService) {
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
    this.conversation.push({ Usuario: 'Sistema', Mensaje: message });
  }

  private newMessage(message: ChatMessage) {
    console.log(message);
    this.conversation.push(message);
  }

  private leftUser(message: string) {
    console.log();
    this.conversation.push({ Usuario: 'Sistema', Mensaje: message });
  }

  buscarUsuarios(){
    if (this.UserBuscar == "") return;
    this.userService.getUsuariosCoincidentesByNombre(this.UserBuscar).subscribe({
      next: data => {
        this.UsuariosBuscados = data;
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  cargarFoto(id : string) {
    this.userService.getFotoAvatar(id).subscribe({
      next: data => {
        return data.Imagen;

        // this.fotoUrl = data.imagen; // Asume que el backend devuelve { imagen: "data:image/jpeg;base64,..." }
      },
      error: error => {
        console.error("Error al descargar la foto", error);
      }
    });
  }
}

