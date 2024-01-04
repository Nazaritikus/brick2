import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {mainPageCollection, ukraineMapColection, worldCollection} from '../shared/collections';
import {Location} from '../shared/interfaces';

@Component({
  selector: 'app-page-banner',
  templateUrl: './page-banner.component.html',
  styleUrls: ['./page-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageBannerComponent implements OnInit{

  @Input() pageName: string;
  pageInfo!: Location;
  image: string;

  constructor() { }

  ngOnInit(): void {
    this.pageInfo = [...mainPageCollection, ...ukraineMapColection, ...worldCollection].find(el => el.codeName === this.pageName);
    this.image = `assets/images/shared/${this.pageName.toLowerCase()}.jpg`
  }
}
