import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBoldSearchTerm]'
})
export class BoldSearchTermDirective implements OnChanges {
  @Input() searchTerm: string = '';
  private originalContent: string = '';

  constructor(private element: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.boldSearchTerm();
    }
  }

  private boldSearchTerm() {
    // Almacenar el contenido original si aún no se ha almacenado
    if (!this.originalContent) {
      this.originalContent = this.element.nativeElement.innerHTML;
    }

    // Si el término de búsqueda está vacío, restaurar el contenido original
    if (!this.searchTerm) {
      this.element.nativeElement.innerHTML = this.originalContent;
      return;
    }

    const escapedSearchTerm = this.escapeRegExp(this.searchTerm);
    const regex = new RegExp(`\\b${escapedSearchTerm}\\b`, 'gi');
    this.highlightText(this.element.nativeElement, regex);
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  private highlightText(element: HTMLElement, regex: RegExp) {
    element.innerHTML = this.originalContent;

    const nodes = this.getTextNodes(element);
    let firstMatchId: string | null = null;

    nodes.forEach((node, index) => {
      if (regex.test(node.nodeValue || '')) {
        const span = document.createElement('span');
        const matchId = `match-${index}`;
        span.id = matchId;
        span.innerHTML = node.nodeValue!.replace(regex, (match: string) => `<strong class="subrayado">${match}</strong>`);
        node.parentNode?.replaceChild(span, node);

        if (!firstMatchId) {
          firstMatchId = matchId;
        }
      }
    });

    if (firstMatchId) {
      this.scrollToElement(firstMatchId);
    }
  }

  private getTextNodes(element: HTMLElement): Text[] {
    let textNodes: Text[] = [];
    function getTextNodesRecursive(node: Node) {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node as Text);
      } else {
        node.childNodes.forEach(child => getTextNodesRecursive(child));
      }
    }
    getTextNodesRecursive(element);
    return textNodes;
  }

  private scrollToElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
