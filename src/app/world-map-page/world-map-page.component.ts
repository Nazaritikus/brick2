import { Component, OnInit } from '@angular/core';
import {Location} from '../shared/interfaces';
import {Collections} from '../shared/collections';

@Component({
  selector: 'app-world-map-page',
  templateUrl: './world-map-page.component.html',
  styleUrls: ['./world-map-page.component.scss']
})

export class WorldMapPageComponent implements OnInit {

  locations: Location[] = Collections.worldCollection

  constructor() { }

  ngOnInit(): void {
  }

}
