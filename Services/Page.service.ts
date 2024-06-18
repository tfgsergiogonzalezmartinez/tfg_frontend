import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService extends BaseService {

constructor(httpClient : HttpClient) {
  super(httpClient);
  this.controller="Page";
 }

}
