import { Injectable } from '@angular/core';
import { UserGetDto } from '../dto/UserDto/UserGetDto';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './Base.service';
import { UserLoginDto } from '../dto/UserDto/UserLoginDto';
import { UserLoginGetDto } from '../dto/UserDto/UserLoginGetDto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

constructor(httpClient : HttpClient) {
  super(httpClient);
  this.controller = 'User';
 }


public Login(userLoginDto : UserLoginDto){
  return this.httpClient.post<UserLoginGetDto>(this.ip + this.controller + '/Login', userLoginDto ,{headers : this.getHeaders()});
}
public Register(UserCreateDto : UserLoginDto){
  return this.httpClient.post<UserLoginGetDto>(this.ip + this.controller + '/Register', UserCreateDto ,{headers : this.getHeaders()});
}


public isLogin():boolean{
  try {
    return (sessionStorage.getItem("Token")!=null) ? true : false;
  } catch (error) {
    return false;
  }
}
public isAdmin():boolean{
  var value=sessionStorage.getItem("Admin") || "false";
  return ((/true/i).test(value));

}

public isUser():boolean{
  var value=sessionStorage.getItem("User") || "false";
  return ((/true/i).test(value));

}

public setSession(user:UserLoginGetDto){
  sessionStorage.setItem("Id",user.Id.toString());
  sessionStorage.setItem("Email",user.Email ||"");
  sessionStorage.setItem("Nombre",user.Nombre);
  sessionStorage.setItem("Apellido1",user.Apellido1);
  sessionStorage.setItem("Apellido2",user.Apellido2);
  sessionStorage.setItem("Rol",user.Rol);
  sessionStorage.setItem("Token",user.Token);
  // this.startTokenTimer(user.tokenTime);

}
}
