import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Truncar'
})
export class TruncarPipe implements PipeTransform {

  transform(value: string, limit: number = 10): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }


}
