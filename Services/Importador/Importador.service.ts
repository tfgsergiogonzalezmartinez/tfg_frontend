import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportadorService {

  constructor() { }

  public cargarCSV(file: File): Promise<{ headers: string[], data: any[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter((line: string) => line.trim() !== '');

        const headers: string[] = [];
        lines[0].split(',').forEach(header => {
          headers.push(header.trim());
        });

        const data = lines.slice(1).map(line => {
          const values = this.parseCSVLine(line);
          const record: { [key: string]: string } = {};
          headers.forEach((header: string, index: number) => {
            record[header] = values[index];
          });
          return record;
        });

        resolve({ headers, data });
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsText(file);
    });
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
        inQuotes = !inQuotes;
        continue;
      }

      if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    if (current) {
      result.push(current.trim());
    }

    return result.map(value => value.replace(/(^"|"$)/g, ''));
  }

}
