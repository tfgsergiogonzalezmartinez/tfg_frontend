import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-MainLayout',
  templateUrl: './MainLayout.component.html',
  styleUrls: ['./MainLayout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private userService: UserService, private mainService : MainService) { }

  ngOnInit() {
  }

  getUserService(){
    return this.userService;
  }

  getMainService(){
    return this.mainService;
  }

}
