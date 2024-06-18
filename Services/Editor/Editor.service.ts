import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { ElementComponent } from '../../src/app/Components/Editor/UI/Element/Element.component';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private listaElementos : ElementRef[] = [];
  private listaComponentes : ElementComponent[] = [];
  private ListaElementosNoMovibles : ElementComponent[] = []; //Elementos que no se pueden mover, cualdo se coje un hijo, los padres no se podran mover

  private seleccionado : ElementRef | null = null;

  private canvasElement : ElementRef | null = null;


  constructor() {

  }


  //! Lista ElementosRef

  public addElement(elemento : ElementRef){
    this.listaElementos.push(elemento);
  }
  public removeElement(elemento : ElementRef){
    this.listaElementos = this.listaElementos.filter(e => e != elemento);
  }
  public getListaElementos(){
    return this.listaElementos;
  }
  public clearListaElementos(){
    this.listaElementos = [];
  }
  //! Lista Componentes

  addComponent(componente : ElementComponent){
    this.listaComponentes.push(componente);
  }
  removeComponent(componente : ElementComponent){
    this.listaComponentes = this.listaComponentes.filter(e => e != componente);
  }
  getListaComponentes(){
    return this.listaComponentes;
  }
  clearListaComponentes(){
    this.listaComponentes = [];
  }
  //! Elementos no movibles, con buscarPadres() de ElementComponent
  getListaElementosNoMovibles(){
    return this.ListaElementosNoMovibles;
  }
  addElementoNoMovible(elemento : ElementComponent){
    this.ListaElementosNoMovibles.push(elemento);
  }

  clearListaElementosNoMovibles(){
    this.ListaElementosNoMovibles = [];
  }

  //! Canvas donde se mete los elementos del editor

  public setCanvasElement(elemento : ElementRef){
    this.canvasElement = elemento;
  }
  public getCanvasElement(){
    return this.canvasElement;
  }

  public getSeleccionado(){
    return this.seleccionado;
  }
  public setSeleccionado(elemento : ElementRef){
    this.seleccionado = elemento;
  }


  //! Funciones de utilidad: -------------------------

  //! check si hay un overlap con otro elemento, devuelve el elemento con el que hay overlap
  public getElement_checkOverlap(mouseEvent: MouseEvent, elementRef : ElementRef): ElementRef | null {
    if (this.listaElementos.length === 0) {
      return null;
    }

    // Obtener el rectángulo del elemento que estamos comprobando
    const x = mouseEvent.clientX;
    const y = mouseEvent.clientY;

    for (let e of this.listaElementos) {
      if (e == elementRef) {
        continue;
      }
      // Obtener el rectángulo del elemento de la lista
      const rect2 = e.nativeElement.getBoundingClientRect();

      // Verificar si hay superposición
      if (
        x < rect2.right &&
        x > rect2.left &&
        y < rect2.bottom &&
        y > rect2.top
      ) {
        // Retornar el elemento de la lista con el que hay superposición
        return e;
      }
    }

    // Si no hay superposición con ningún elemento
    return null;
  }
  //! Devuelve el componente que tiene el elementoRef
  getComponenteFromElementRef(elementRef : ElementRef){
    return this.listaComponentes.find(e => e.getElementRef() == elementRef);
  }




}
