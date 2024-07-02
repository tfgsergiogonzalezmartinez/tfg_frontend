import { Component, EventEmitter, Input, OnInit, Output, input, output } from '@angular/core';

@Component({
  selector: 'app-inputForm',
  templateUrl: './inputForm.component.html',
  styleUrls: ['./inputForm.component.css']
})
export class InputFormComponent implements OnInit {
  @Input() titulo : string = "";
  @Input() placeholder : string = "";
  @Input() type : string = "text";
  @Input() isDescripcion : boolean = false;
  value : string = "";

  @Output() valueEventEmitter : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  getValue(){
    this.valueEventEmitter.emit(this.value);
  }

}
