import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColoresService {

constructor() { }

hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Función para ajustar el brillo de un color RGB
ajustarBrillo({ r, g, b }: { r: number, g: number, b: number }, amount: number): { r: number, g: number, b: number } {
  return {
      r: Math.min(255, Math.max(0, r + amount)),
      g: Math.min(255, Math.max(0, g + amount)),
      b: Math.min(255, Math.max(0, b + amount))
  };
}

// Función principal para generar colores más claros y oscuros
generarColores(entrada: string): { colorMasClaro: string, colorMasOscuro: string } {
  let rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+|\d*\.\d+))?\)/;
  let rgbColor;

  if (entrada.startsWith('#')) {
      let rgb = this.hexToRgb(entrada);
      if (!rgb) throw new Error('Formato de color no válido');
      rgbColor = rgb;
  } else if (rgbaRegex.test(entrada)) {
      let result = rgbaRegex.exec(entrada);
      if (!result) throw new Error('Formato de color no válido');
      rgbColor = {
          r: parseInt(result[1]),
          g: parseInt(result[2]),
          b: parseInt(result[3])
      };
  } else {
      throw new Error('Formato de color no reconocido');
  }

  let colorMasClaro = this.ajustarBrillo(rgbColor, 30);
  let colorMasOscuro = this.ajustarBrillo(rgbColor, -30);

  return {
      colorMasClaro: this.rgbToHex(colorMasClaro.r, colorMasClaro.g, colorMasClaro.b),
      colorMasOscuro: this.rgbToHex(colorMasOscuro.r, colorMasOscuro.g, colorMasOscuro.b)
  };
}


}
