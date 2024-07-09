import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';
import { UserLoginDto } from '../../../../dto/UserDto/UserLoginDto';
import { UserLoginGetDto } from '../../../../dto/UserDto/UserLoginGetDto';
import { Router } from '@angular/router';
import { UserCreateDto } from '../../../../dto/UserDto/UserCreateDto';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-LoginPage',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.css']
})
export class LoginPageComponent implements OnInit {
  //modos
  public isLoginMode: boolean = true;
  public isRegistroMode: boolean = false;

  public email!: string;
  public password!: string;


  //registro
  public EmailRegister!: string;
  public PasswordRegister!: string;
  public PasswordRepeat!: string;
  public Nombre!: string;
  public Apellido1!: string;
  public Apellido2!: string;
  public FechaNacimiento!: Date;

  constructor(private userService: UserService, private router: Router, private mainService: MainService) {
    if (userService.getIsRegisterFromMain()) {
      this.ActivarRegistroMode();
    }
  }

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
  pressEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }


  public login() {
    if (!this.email || !this.password) {
      return;
    }

    let login: UserLoginDto = {
      Email: this.email,
      Password: this.password
    };
    this.userService.Login(login).subscribe(
      (data: UserLoginGetDto) => {
        this.mainService.setIcono("check");
        this.mainService.setMensaje("¡Bienvenido " + data.Nombre +"!");
        this.mainService.activarMensaje();
        this.userService.setSession(data);
        this.router.navigate(['/main']);
      },
      (error: any) => {
        this.mainService.setIcono("error");
        this.mainService.setMensaje("Error al iniciar sesión.");
        this.mainService.activarMensaje();
      }
    );
  }

  public Registrar() {
    if (!this.EmailRegister || !this.PasswordRegister || !this.PasswordRepeat || !this.Nombre || !this.Apellido1 || !this.Apellido2 || !this.FechaNacimiento) {
      this.mainService.setIcono("error");
      this.mainService.setMensaje("Rellene todos los campos");
      this.mainService.activarMensaje();
      return;
    }
    if (this.PasswordRegister != this.PasswordRepeat) {
      this.mainService.setIcono("error");
      this.mainService.setMensaje("Las contraseñas no coinciden");
      this.mainService.activarMensaje();
      return;
    }
    let register: UserCreateDto = {
      Email: this.EmailRegister,
      Password: this.PasswordRegister,
      Nombre: this.Nombre,
      Apellido1: this.Apellido1,
      Apellido2: this.Apellido2,
      FechaNacimiento: this.FechaNacimiento
    };
    this.userService.Register(register).subscribe({
      next: (data: UserLoginGetDto) => {
        this.mainService.setIcono("check");
        this.mainService.setMensaje("!Bienvenido " + data.Nombre + "¡");
        this.mainService.activarMensaje();
        this.userService.setSession(data);
        this.router.navigate(['/main']);
      },
      error: (error: any) => {
        this.mainService.setIcono("error");
        this.mainService.setMensaje("Error al realizar el registro");
        this.mainService.activarMensaje();
      }
    });
  }

  ActivarRegistroMode() {
    this.isLoginMode = false;
    this.isRegistroMode = true;
  }
  ActivarLoginMode() {
    this.isLoginMode = true;
    this.isRegistroMode = false;
  }




}
