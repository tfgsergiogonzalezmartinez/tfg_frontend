import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-LoginLayout',
  templateUrl: './LoginLayout.component.html',
  styleUrls: ['./LoginLayout.component.css']
})
export class LoginLayoutComponent implements OnInit {

  constructor(private mainService : MainService) { }

  ngOnInit() {
  }

  getMainService(){
    return this.mainService;
  }

}
