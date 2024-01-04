import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BrickItem} from '../shared/interfaces';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styles: [
    `
      .card-img-top {
        height: 260px;
        object-fit: cover;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent {

  @Input() brickItem: BrickItem;

  constructor() { }

}
