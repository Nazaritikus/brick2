import {Pipe, PipeTransform} from '@angular/core';
import {BrickItem} from './interfaces';

@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform{

  transform(value: BrickItem[], search: string = ''): BrickItem[] {
    return search === ''
      ? value
      : value.filter(el => el.name.trim().toLowerCase().includes(search.trim().toLowerCase()))
  }

}
