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
          const values = line.split(',').map(value => value.trim());
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

}
