import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

protected controller : string;
protected ip : string = 'http://localhost:5059/api/';  //TODO CAMBIAR por variables de entorno [enviroment]
constructor( protected httpClient : HttpClient) {
  this.controller = 'Base';
 }

  public GetAll(){
    return this.httpClient.get<any>(this.ip + this.controller , {headers: this.getHeaders()});
  }

  public GetById(id : string){
    return this.httpClient.get<any>(this.ip + this.controller + '/' + id , {headers: this.getHeaders()});

  }
  public Create(entidad : any){
    return this.httpClient.post<any>(this.ip + this.controller + "/", entidad , {headers: this.getHeaders()});
  }
  public Update(id : string, entidad : any){
    return this.httpClient.put<any>(this.ip + this.controller + "/" + id, entidad, {headers: this.getHeaders()});
  }
  public UpdateObj(entidad : any){
    return this.httpClient.put<any>(this.ip + this.controller + "/", entidad , {headers: this.getHeaders()});
  }
  public Delete(id : string){
    return this.httpClient.delete<any>(this.ip + this.controller + '/' + id , {headers: this.getHeaders()});
  }
  public DeleteObj(entidad : any){
    return this.httpClient.delete<any>(this.ip + this.controller + '/' + entidad , {headers: this.getHeaders()});
  }

  protected getHeaders(){
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization','Bearer '+ sessionStorage.getItem("Token") || "");
  }

}
