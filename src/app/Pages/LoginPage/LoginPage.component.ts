import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';
import { UserLoginDto } from '../../../../dto/UserDto/UserLoginDto';
import { UserLoginGetDto } from '../../../../dto/UserDto/UserLoginGetDto';
import { Router } from '@angular/router';
import { UserCreateDto } from '../../../../dto/UserDto/UserCreateDto';

@Component({
  selector: 'app-LoginPage',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.css']
})
export class LoginPageComponent implements OnInit {
  //modos
  public isLoginMode: boolean = true;
  public isRegistroMode: boolean = false;

  public email! : string;
  public password! : string;


  //registro
  public EmailRegister!: string;
  public PasswordRegister!: string;
  public PasswordRepeat!: string;
  public Nombre!: string;
  public Apellido1!: string;
  public Apellido2!: string;
  public FechaNacimiento!: Date;

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
  pressEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }


  public login(){
    if (!this.email || !this.password) {
      return;
    }

    let login : UserLoginDto = {
      Email: this.email,
      Password: this.password
    };
    this.userService.Login(login).subscribe(
      (data: UserLoginGetDto)  => {
      this.userService.setSession(data);
      this.router.navigate(['/main']);
      },
      (error: any) => {
      console.log(error);
      }
    );
  }

  public Registrar(){
    if (!this.EmailRegister || !this.PasswordRegister || !this.PasswordRepeat || !this.Nombre || !this.Apellido1 || !this.Apellido2 || !this.FechaNacimiento) {
      return;
    }
    if(this.PasswordRegister != this.PasswordRepeat){
      return;
    }
    let register : UserCreateDto = {
      Email: this.EmailRegister,
      Password: this.PasswordRegister,
      Nombre: this.Nombre,
      Apellido1: this.Apellido1,
      Apellido2: this.Apellido2,
      FechaNacimiento: this.FechaNacimiento
    };
    this.userService.Register(register).subscribe({
      next: (data: UserLoginGetDto) => {
        this.userService.setSession(data);
        this.router.navigate(['/main']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ActivarRegistroMode(){
    this.isLoginMode = false;
    this.isRegistroMode = true;
  }
  ActivarLoginMode(){
    this.isLoginMode = true;
    this.isRegistroMode = false;
  }




}
