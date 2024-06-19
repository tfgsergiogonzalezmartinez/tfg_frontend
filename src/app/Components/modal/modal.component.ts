import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() exitEventEmitter : EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {



  }

  closeModal(){
    this.exitEventEmitter.emit();
  }

}
