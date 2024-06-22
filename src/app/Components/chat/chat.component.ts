import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../Services/Chat/Chat.service';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../../../../Interfaces/Chat/ChatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public user = '';
  public group = '';
  public message = '';
  public connected = false;
  public conversation: ChatMessage[] = [{
    Mensaje: 'Bienvenido',
    Usuario: 'Sistema'
  }];

  private connection: HubConnection;

  constructor() {
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

  public join() {
    this.connection.invoke('JoinGroup', this.group, this.user)
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
}

