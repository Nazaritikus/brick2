import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RestService} from '../shared/services/rest.service';
import {BrickItem} from '../shared/interfaces';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsPageComponent implements OnInit {

  item$: Observable<BrickItem>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService,
    public location: Location
  ) {
  }

  ngOnInit() {
    this.item$ = this.activatedRoute.params.pipe(
      switchMap(({regionName, id}: Params) =>
        this.restService.getItemById(id, regionName).pipe(
          switchMap((item: BrickItem) =>
            this.restService.getItemDescription(item.descriptionId, regionName).pipe(
              map(desc => ({...item, description: desc.description}))
            )),
        )),
    );
  }
}
