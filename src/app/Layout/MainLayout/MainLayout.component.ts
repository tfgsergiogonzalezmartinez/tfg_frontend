import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';

@Component({
  selector: 'app-MainLayout',
  templateUrl: './MainLayout.component.html',
  styleUrls: ['./MainLayout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getUserService(){
    return this.userService;
  }

}
