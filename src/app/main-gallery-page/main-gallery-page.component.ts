import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Location} from '../shared/interfaces';
import {mainPageCollection} from '../shared/collections';


@Component({
  selector: 'app-main-gallery-page',
  templateUrl: './main-gallery-page.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainGalleryPageComponent {

  collection: Location[] = mainPageCollection;

  constructor() { }

}
