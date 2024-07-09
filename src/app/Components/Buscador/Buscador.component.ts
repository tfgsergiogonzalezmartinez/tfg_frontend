import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Buscador',
  templateUrl: './Buscador.component.html',
  styleUrls: ['./Buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {
  }
  buscar() {
    this.limpiarResaltados();
    if (this.searchTerm.trim()) {
      this.resaltarTexto(this.searchTerm);
    }
  }

  limpiarResaltados() {
    const elementosResaltados = document.querySelectorAll('.highlight');
    elementosResaltados.forEach(elemento => {
      const parent = elemento.parentNode as HTMLElement;
      parent.innerHTML = parent.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
    });
  }

  resaltarTexto(searchTerm: string) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    this.resaltarEnElemento(document.body, regex);
  }

  resaltarEnElemento(elemento: HTMLElement, regex: RegExp) {
    if (elemento.children.length) {
      Array.from(elemento.children).forEach(hijo => this.resaltarEnElemento(hijo as HTMLElement, regex));
    } else if (elemento.innerHTML) {
      elemento.innerHTML = elemento.innerHTML.replace(regex, '<span class="highlight">$1</span>');
    }
  }


}
