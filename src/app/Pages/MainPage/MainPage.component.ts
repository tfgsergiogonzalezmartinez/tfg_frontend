import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../Services/User/User.service';

@Component({
  selector: 'app-MainPage',
  templateUrl: './MainPage.component.html',
  styleUrls: ['./MainPage.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private mainService : MainService, private router : Router, private userService : UserService ) { }

  ngOnInit() {
  }

  getService(){
    return this.mainService;
  }

  goProyectos(){
    if(this.userService.isLogin()) this.router.navigate(['/main/proyectos']);
    if(!this.userService.isLogin()) this.router.navigate(['/login']);
  }
  goDocumentacion(){
    this.router.navigate(['/main/documentacion']);
  }

}
