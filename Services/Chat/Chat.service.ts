import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable, filter, tap } from 'rxjs';
import { MensajesNoLeidosDto } from '../../dto/ChatDto/MensajesNoLeidosDto';
import { GetChatDto } from '../../dto/ChatDto/GetChatDto';
import { ChatUsuariosRequestDto } from '../../dto/ChatDto/ChatUsuariosRequestDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.controller = 'Chat';
  }

  public GetByUser(id: string) {
    return this.httpClient.get<GetChatDto[]>(this.apiIp + this.controller + "/" + "GetByUser/" + id , {headers: this.getHeaders()} );
  }
  public GetByUsers(userId1 : string, userId2 : string) {
    return this.httpClient.get<GetChatDto>(this.apiIp + this.controller + "/" + "GetByUsers/" + userId1 + "/" + userId2 ,  {headers: this.getHeaders()} );
  }
  public GetChatsAbiertos(idUser : string) {
    return this.httpClient.get<GetChatDto[]>(this.apiIp + this.controller + "/" + "GetChatsAbiertos/" + idUser , {headers: this.getHeaders()} );
  }
  public GetNumMensajesSinLeer(idUser1 : string, idUser2 : string) {
    return this.httpClient.get<MensajesNoLeidosDto>(this.apiIp + this.controller + "/" + "GetNumMensajesSinLeer/" + idUser1 + "/" + idUser2 , {headers: this.getHeaders()} );
  }
  public LeerChat(idUser1 : string, idUser2 : string) {
    const request : ChatUsuariosRequestDto = {UserId1 : idUser1, UserId2 : idUser2};
    return this.httpClient.post(this.apiIp + this.controller + "/" + "LeerChat/" , request, {headers: this.getHeaders()} );
  }
  public CerrarChat(idUser1 : string, idUser2 : string) {
    const request : ChatUsuariosRequestDto = {UserId1 : idUser1, UserId2 : idUser2};
    return this.httpClient.post(this.apiIp + this.controller + "/" + "CerrarChat/" , request , {headers: this.getHeaders()} );
  }
  public AbrirChat(idUser1 : string, idUser2 : string) {
    const request : ChatUsuariosRequestDto = {UserId1 : idUser1, UserId2 : idUser2};
    return this.httpClient.post(this.apiIp + this.controller + "/" + "AbrirChat/" , request , {headers: this.getHeaders()} );
  }

}
