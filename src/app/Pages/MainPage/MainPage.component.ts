import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-MainPage',
  templateUrl: './MainPage.component.html',
  styleUrls: ['./MainPage.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private mainService : MainService, private router : Router ) { }

  ngOnInit() {
  }

  getService(){
    return this.mainService;
  }

  goProyectos(){
    this.router.navigate(['/main/proyectos']);
  }
  goDocumentacion(){
    this.router.navigate(['/main/documentacion']);
  }

}
