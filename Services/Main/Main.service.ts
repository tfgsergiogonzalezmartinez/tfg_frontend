import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private modo_oscuro: boolean = false;
  private modo_claro: boolean = true;

  private activarMsg: boolean = false;
  private textoMsg: string = "La contraseña se ha cambiado con exito";
  private iconoMsg: string = "error";

  private mainDivRef!: ElementRef;

  constructor() { }


  isModoOscuro() {
    return this.modo_oscuro;
  }
  isModoClaro() {
    return this.modo_claro;
  }
  toggleModo() {
    this.modo_oscuro = !this.modo_oscuro;
    this.modo_claro = !this.modo_claro;

    if (this.modo_claro) this.mainDivRef.nativeElement.classList.remove('dark');
    if (this.modo_oscuro) this.mainDivRef.nativeElement.classList.add('dark');
  }

  setMainDiv(divRef: ElementRef) {
    this.mainDivRef = divRef;
  }
  getMainDiv() {
    return this.mainDivRef;
  }

  activarMensaje() {
    this.activarMsg = true;
    setTimeout(() => {
      this.activarMsg = false;
    }, 5000);
  }

  setMensaje(texto: string) {
    this.textoMsg = texto;
  }
  getMensaje() {
    return this.textoMsg;
  }

  setIcono(icono: string) {
    this.iconoMsg = icono;
  }
  getIcono() {
    return this.iconoMsg;
  }
  isActivarMsg() {
    return this.activarMsg;
  }

}
