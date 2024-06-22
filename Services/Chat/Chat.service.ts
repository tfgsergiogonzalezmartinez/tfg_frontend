import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {
  private socket$: WebSocketSubject<any>;
  private conversations: Map<string, any[]> = new Map();

constructor(httpClient : HttpClient) {
  super(httpClient);
  this.controller = 'Chat';
  this.socket$ = new WebSocketSubject(this.chatIp);

 }
 joinConversation(conversationId: string) {
  if (!this.conversations.has(conversationId)) {
    this.conversations.set(conversationId, []);
  }
  this.socket$.next({ action: 'JoinConversation', conversationId });
}

sendMessage(conversationId: string, message: any) {
  this.socket$.next({ conversationId, ...message });
}

getMessages(conversationId: string): Observable<any> {
  console.log(this.conversations);
  return this.socket$.asObservable().pipe(
    filter(msg => msg.conversationId === conversationId),
    tap(msg => this.conversations.get(conversationId)?.push(msg))
  );
}

getConversationMessages(conversationId: string): any[] {
  return this.conversations.get(conversationId)!;
}

}
