import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RestService} from '../shared/services/rest.service';
import {switchMap} from 'rxjs/operators';
import {NewItem} from '../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-inner-gallery-page',
  templateUrl: './inner-gallery-page.component.html',
  styleUrls: ['./inner-gallery-page.component.scss']
})
export class InnerGalleryPageComponent implements OnInit, OnDestroy {

  items //NewItem[]
  itemsToShow: NewItem[]
  region: string
  search: string
  getSub: Subscription
  numberOfTab: number[]
  numberOnPage: number = 20
  activeTab: number = 0
  image = './assets/images/shared/lviv.jpg'

  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.getSub = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        this.region = params['regionName']
        return this.restService.getAllFromRegion(params['regionName'])
      })
    ).subscribe(resp => {
      this.items = resp
      this.items.push(...[1,2,3,4,5,1,2,4,5,6,6,6,6,4,3,34,3,43,4,34,3,43])
      this.numberOfTab = Array.from(Array(Math.ceil(this.items.length / this.numberOnPage)).keys())
      this.setItemsForShow(1)
    })
  }

  setItemsForShow(pageNum: number){
    this.itemsToShow = this.items.filter((el, idx) =>
      idx >= (pageNum * this.numberOnPage - this.numberOnPage) && idx < pageNum * this.numberOnPage)
    this.activeTab = pageNum
  }

  ngOnDestroy() {
    this.getSub.unsubscribe()
  }

}
