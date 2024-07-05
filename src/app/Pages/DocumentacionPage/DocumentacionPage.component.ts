import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-DocumentacionPage',
  templateUrl: './DocumentacionPage.component.html',
  styleUrls: ['./DocumentacionPage.component.css']
})
export class DocumentacionPageComponent implements OnInit {
  searchTerm: string = '';

  constructor(private mainService : MainService) { }
  ngOnInit() {
  }

  scrollToElement(id : string) {
    let element = document.getElementById(id);
    element?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  getService(){
    return this.mainService;
  }

}
