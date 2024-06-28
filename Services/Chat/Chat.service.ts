import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {
  private conversations: Map<string, any[]> = new Map();

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

}
