import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('modal') modalRef! : ElementRef;
  @Output() exitEventEmitter : EventEmitter<void> = new EventEmitter<void>();
  private clickFondoListener!: () => void;
  private primeraVez : boolean = true;
  constructor(private renderer2 : Renderer2) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.clickFondoListener = this.renderer2.listen('document', 'click', (event) => {
      this.clickFuera(event);
    });
  }

  closeModal(){
    this.exitEventEmitter.emit();
  }

  clickFuera(event: any){
    //quiero que en caso de que se click fuera del modal, se cierre
    if (this.primeraVez){
      this.primeraVez = false;
      return;
    }
    if (!this.modalRef.nativeElement.contains(event.target)){
      this.closeModal();
    }
  }

}
