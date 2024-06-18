import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/User.service';
import { UserLoginDto } from '../../../../dto/UserDto/UserLoginDto';
import { UserLoginGetDto } from '../../../../dto/UserDto/UserLoginGetDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-LoginPage',
  templateUrl: './LoginPage.component.html',
  styleUrls: ['./LoginPage.component.css']
})
export class LoginPageComponent implements OnInit {
  public email! : string;
  public password! : string;

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit() {
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



}
