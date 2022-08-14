import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Location} from '../shared/interfaces';
import {worldCollection} from '../shared/collections';

@Component({
  selector: 'app-world-map-page',
  templateUrl: './world-map-page.component.html',
  styleUrls: ['./world-map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorldMapPageComponent {

  locations: Location[] = worldCollection

  constructor() { }

}
