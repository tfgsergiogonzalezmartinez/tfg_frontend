import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-Tooltip',
  templateUrl: './Tooltip.component.html',
  styleUrls: ['./Tooltip.component.css']
})
export class TooltipComponent implements OnInit {

  constructor(private mainService : MainService) { }

  ngOnInit() {
  }


  getMainService(){
    return this.mainService;
  }

}
