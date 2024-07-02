import { Injectable } from '@angular/core';
import { UserGetDto } from '../../dto/UserDto/UserGetDto';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../Base.service';
import { UserLoginDto } from '../../dto/UserDto/UserLoginDto';
import { UserLoginGetDto } from '../../dto/UserDto/UserLoginGetDto';
import { UserCambiarPassword } from '../../dto/UserDto/UserCambiarPassword';
import { UserModificarRolDto } from '../../dto/UserDto/UserModificarRolDto';
import { ImagenDto } from '../../dto/UserDto/ImagenDto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private isRegisterFromMain: boolean = false;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.controller = 'User';
  }


  public Login(userLoginDto: UserLoginDto) {
    return this.httpClient.post<UserLoginGetDto>(this.apiIp + this.controller + '/Login', userLoginDto, { headers: this.getHeaders() });
  }
  public Register(UserCreateDto: UserLoginDto) {
    return this.httpClient.post<UserLoginGetDto>(this.apiIp + this.controller + '/Register', UserCreateDto, { headers: this.getHeaders() });
  }
  public cambiarPassword(userCambiarPassword: UserCambiarPassword) {
    return this.httpClient.post(this.apiIp + this.controller + "/CambiarPassword", userCambiarPassword, { headers: this.getHeaders() });
  }
  public ModificarRol(userModificarRolDto: UserModificarRolDto) {
    return this.httpClient.post(this.apiIp + this.controller + "/ModificarRol", userModificarRolDto, { headers: this.getHeaders() });
  }
  public subirFotoAvatar(usuarioId: string, archivo: string){
    const imagen : ImagenDto = {
      Imagen: archivo
    }
    return this.httpClient.post(this.apiIp + this.controller + "/" + usuarioId + "/" + "subirBase64", imagen, {headers: this.getHeaders()});
  }

  public getFotoAvatar(usuarioId: string) {
    return this.httpClient.get<ImagenDto>(this.apiIp + this.controller + "/" + usuarioId +"/"+"fotoBase64", {headers:this.getHeaders() });
  }

  public getUsuariosCoincidentesByNombre(nombre : string){
    return this.httpClient.get<UserGetDto[]>(this.apiIp + this.controller + "/ObtenerUsuariosCoincidentes/" + nombre, {headers: this.getHeaders()});
  }


  public isLogin(): boolean {
    try {
      return (sessionStorage.getItem("Token") != null) ? true : false;
    } catch (error) {
      return false;
    }
  }
  public isAdmin(): boolean {
    var value = sessionStorage.getItem("Rol") || "false";
    return ((/admin/i).test(value));


  }

  public isUser(): boolean {
    var value = sessionStorage.getItem("Rol") || "false";
    return ((/user/i).test(value));
  }

  public setSession(user: UserLoginGetDto) {
    sessionStorage.setItem("Id", user.Id.toString());
    sessionStorage.setItem("Email", user.Email || "");
    sessionStorage.setItem("Nombre", user.Nombre);
    sessionStorage.setItem("Apellido1", user.Apellido1);
    sessionStorage.setItem("Apellido2", user.Apellido2);
    sessionStorage.setItem("Rol", user.Rol);
    sessionStorage.setItem("Token", user.Token);
    // this.startTokenTimer(user.tokenTime);
  }

  public logout() {
    sessionStorage.clear();
    // this.stopTokenTimer();
  }

  getIsRegisterFromMain() {
    return this.isRegisterFromMain;
  }
  setIsRegisterFromMain(value: boolean) {
    this.isRegisterFromMain = value;
  }


}
