import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], args: string, sortOrder: string = 'asc'): any[] {
    if (!value || value.length === 0) {
      return value;
    }

    return value.sort((a, b) => {
      if (a[args] < b[args]) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (a[args] > b[args]) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
