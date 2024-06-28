import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable, filter, tap } from 'rxjs';
import { MensajesNoLeidosDto } from '../../dto/ChatDto/MensajesNoLeidosDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.controller = 'Chat';
  }

  public GetByUser(id: string) {
    return this.httpClient.get(this.apiIp + this.controller + "/" + "GetByUser/" + id , {headers: this.getHeaders()} );
  }
  public GetByUsers(ids : string[]) {
    return this.httpClient.get(this.apiIp + this.controller + "/" + "GetByUsers/" + ids , {headers: this.getHeaders()} );
  }
  public LeerChat(idUser1 : string, idUser2 : string) {
    return this.httpClient.get(this.apiIp + this.controller + "/" + "LeerChat/" + idUser1 + "/" + idUser2 , {headers: this.getHeaders()} );
  }
  public GetNumMensajesSinLeer(idUser1 : string, idUser2 : string) {
    return this.httpClient.get<MensajesNoLeidosDto>(this.apiIp + this.controller + "/" + "GetNumMensajesSinLeer/" + idUser1 + "/" + idUser2 , {headers: this.getHeaders()} );
  }

}
