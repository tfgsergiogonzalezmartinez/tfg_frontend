import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../Base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

constructor(httpClient : HttpClient) {
  super(httpClient);
  this.controller = 'Chat';
 }

}
