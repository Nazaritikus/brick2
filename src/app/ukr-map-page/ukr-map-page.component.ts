import { Component, OnInit } from '@angular/core';
import {Location} from '../shared/interfaces';
import {ukraineMapColection} from '../shared/collections';

@Component({
  selector: 'app-ukr-map-page',
  templateUrl: './ukr-map-page.component.html',
  styleUrls: ['./ukr-map-page.component.scss']
})
export class UkrMapPageComponent implements OnInit {

  locations: Location[] = ukraineMapColection;

  constructor() { }

  ngOnInit(): void {

  }

}
