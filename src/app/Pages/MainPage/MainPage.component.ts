import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-MainPage',
  templateUrl: './MainPage.component.html',
  styleUrls: ['./MainPage.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private mainService : MainService ) { }

  ngOnInit() {
  }

  getService(){
    return this.mainService;
  }

}
