import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../shared/services/rest.service';
import {Collections} from '../../shared/collections';
import {Location, NewItem} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  loadingTable: boolean = false
  collectionList: Location[] = []
  region: string = 'lviv'
  tableData: NewItem[] = []
  sub: Subscription
  search: string = ''

  constructor(
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.collectionList = [...Collections.mainPageCollection, ...Collections.ukraineMapColection, ...Collections.worldCollection]
      .filter(el => el.codeName !== 'ukr' && el.codeName !== 'world');
    this.uploadRegion()
  }

  uploadRegion() {
    this.loadingTable = true
    this.sub = this.restService.getAllFromRegion(this.region).subscribe(resp => {
      this.tableData = resp
      this.loadingTable = false
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
