import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable, filter, tap } from 'rxjs';
import { MensajesNoLeidosDto } from '../../dto/ChatDto/MensajesNoLeidosDto';
import { GetChatDto } from '../../dto/ChatDto/GetChatDto';
import { ChatUsuariosRequestDto } from '../../dto/ChatDto/ChatUsuariosRequestDto';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../../Interfaces/Chat/ChatMessage';
import { Enviroment } from '../../Enviroment';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {
  private connection!: HubConnection;
  private isConnectionEstablished: boolean = false;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.controller = 'Chat';
  }

  public GetByUser(id: string) {
    return this.httpClient.get<GetChatDto[]>(this.apiIp + this.controller + "/" + "GetByUser/" + id, { headers: this.getHeaders() });
  }
  public GetByUsers(userId1: string, userId2: string) {
    return this.httpClient.get<GetChatDto>(this.apiIp + this.controller + "/" + "GetByUsers/" + userId1 + "/" + userId2, { headers: this.getHeaders() });
  }
  public GetChatsAbiertos(idUser: string) {
    return this.httpClient.get<GetChatDto[]>(this.apiIp + this.controller + "/" + "GetChatsAbiertos/" + idUser, { headers: this.getHeaders() });
  }
  public GetNumMensajesSinLeer(idUser1: string, idUser2: string) {
    return this.httpClient.get<MensajesNoLeidosDto>(this.apiIp + this.controller + "/" + "GetNumMensajesSinLeer/" + idUser1 + "/" + idUser2, { headers: this.getHeaders() });
  }
  public LeerChat(idUser1: string, idUser2: string) {
    const request: ChatUsuariosRequestDto = { UserId1: idUser1, UserId2: idUser2 };
    return this.httpClient.post(this.apiIp + this.controller + "/" + "LeerChat/", request, { headers: this.getHeaders() });
  }
  public CerrarChat(idUser1: string, idUser2: string) {
    const request: ChatUsuariosRequestDto = { UserId1: idUser1, UserId2: idUser2 };
    return this.httpClient.post(this.apiIp + this.controller + "/" + "CerrarChat/", request, { headers: this.getHeaders() });
  }
  public AbrirChat(idUser1: string, idUser2: string) {
    const request: ChatUsuariosRequestDto = { UserId1: idUser1, UserId2: idUser2 };
    return this.httpClient.post(this.apiIp + this.controller + "/" + "AbrirChat/", request, { headers: this.getHeaders() });
  }

  public iniciarConexion() {
    console.log('Iniciando Conexion');
    console.log(`${Enviroment.BACKEND_URL}/WebChat?user=${sessionStorage.getItem('Id')}&token=${sessionStorage.getItem('Token')}`);
    console.log('Connection Started');

    this.connection = new HubConnectionBuilder()
      .withUrl(`${Enviroment.BACKEND_URL}/WebChat?user=${sessionStorage.getItem('Id')}&token=${sessionStorage.getItem('Token')}`, {
        withCredentials: true
      })
      .build();

    this.connection.start()
      .then(() => {
        console.log('Connection Started');
        this.isConnectionEstablished = true;
      })
      .catch(error => {
        console.error('Connection Error: ', error);
        this.isConnectionEstablished = false;
      });
  }

  public getHubConnection() {
    return this.connection;
  }






}
