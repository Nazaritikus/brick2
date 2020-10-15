import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../shared/services/rest.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewItem} from '../../shared/interfaces';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  imgPlaceholder = '/assets/images/shared/image-placeholder.png';
  imgSrcMain = this.imgPlaceholder
  imgSrcThumbnails = this.imgPlaceholder
  region: string
  id: string
  item: NewItem
  submited = false

  sub: Subscription

  constructor(
    private restService: RestService,
    private activatedRoute: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        this.region = params['region']
        this.id = params['id']
        return this.restService.getItemById(params['id'], params['region'])
      })
    ).subscribe((item: NewItem) => {
      this.item = item
      this.imgSrcMain = item.mainImg
      this.imgSrcThumbnails = item.thumbnail
      this.form = new FormGroup({
        name: new FormControl(item.name, Validators.required),
        withDescription: new FormControl(!!item.description),
        description: new FormControl(item.description)
      })
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }

    this.submited = true

    this.sub = this.restService.updateInfo(this.id, this.region, {
      ...this.item,
      name: this.form.value.name,
      description: this.form.value.description
    }).subscribe((post: NewItem) => {
        this.submited = false
        this.alert.success('Давно треба було це відредагувати!')
    })
  }

  ngOnDestroy() {
    if(this.sub){
      this.sub.unsubscribe()
    }
  }
}
