import {Pipe, PipeTransform} from '@angular/core';
import {NewItem} from './interfaces';

@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform{

  transform(value: NewItem[], search: string = ''): NewItem[] {
    return search === ''
      ? value
      : value.filter(el => el.name.trim().toLowerCase().includes(search.trim().toLowerCase()))
  }

}
