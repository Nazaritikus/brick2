import { Component, OnInit } from '@angular/core';
import {Location} from '../shared/interfaces';
import {Collections} from '../shared/collections';


@Component({
  selector: 'app-main-gallery-page',
  templateUrl: './main-gallery-page.component.html',
  styles: [
  ]
})
export class MainGalleryPageComponent implements OnInit {

  collection: Location[] = Collections.mainPageCollection

  constructor() { }

  ngOnInit(): void {
  }

}
