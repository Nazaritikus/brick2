import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BrickItem} from '../shared/interfaces';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent {

  @Input() brickItem: BrickItem;

  constructor() { }

}
