import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RestService} from '../shared/services/rest.service';
import {NewItem} from '../shared/interfaces';
import {startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: [ './items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {

  region: string
  id: string
  item$: Observable<NewItem>

  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.item$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        this.id = params['id']
        this.region = params['regionName']
        return this.restService.getItemById(this.id, this.region)
      })
    )
  }

}
