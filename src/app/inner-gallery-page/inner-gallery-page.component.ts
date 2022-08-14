import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RestService} from '../shared/services/rest.service';
import {map, switchMap} from 'rxjs/operators';
import {BrickItem} from '../shared/interfaces';
import {combineLatest, Observable} from 'rxjs';

@Component({
  selector: 'app-inner-gallery-page',
  templateUrl: './inner-gallery-page.component.html',
  styleUrls: ['./inner-gallery-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnerGalleryPageComponent implements OnInit {

  items$: Observable<BrickItem[]>;
  region: string;
  search = '';
  image = '';
  lastPage = true;
  currentPage = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) {
  }

  ngOnInit(): void {
    this.items$ = combineLatest([
      this.activatedRoute.params.pipe(
        switchMap((params: Params) => {
          this.region = params['regionName'];
          this.image = `'./assets/images/shared/${this.region.toLowerCase()}.jpg';`
          return this.restService.getAllFromRegion(params['regionName']);
        })
      ),
      this.activatedRoute.queryParams.pipe(map(params => params?.page || this.setQueryParam(1)))
    ]).pipe(
      map(([data, page]) => {
        if (!data) return [];
        const sortedData = data
          .filter(item => item.name.trim().toLowerCase().includes(this.search.trim().toLowerCase()))
          .filter((item, idx) => idx < page * 9 && idx >= page * 9 - 9);
        this.currentPage = +page;
        this.lastPage = sortedData.length < 9;
        return sortedData;
      })
    );
  }

  setQueryParam = (page: number) =>
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page }
      });
}
