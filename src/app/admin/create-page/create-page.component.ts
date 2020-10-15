import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Collections} from '../../shared/collections';
import {Location, NewItem} from '../../shared/interfaces';
import {AngularFireStorage} from '@angular/fire/storage';
import { Subscription} from 'rxjs';
import {RestService} from '../../shared/services/rest.service';
import {AlertService} from '../shared/services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy {

  form: FormGroup
  collectionList: Location[] = []
  imgPlaceholder = '/assets/images/shared/image-placeholder.png'
  imgSrcMain = this.imgPlaceholder
  imgSrcThumbnails = this.imgPlaceholder
  selectedMainImg: any = null
  selectedThumbnailsImg: any = null
  createSub: Subscription
  isLoading: boolean = false


  constructor(
    private storage: AngularFireStorage,
    private restServise: RestService,
    private alert: AlertService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.collectionList = [...Collections.mainPageCollection, ...Collections.ukraineMapColection, ...Collections.worldCollection]
      .filter(el => el.codeName !== 'ukr' && el.codeName !== 'world');

    // TODO array assign
    this.form = this.fb.group({
      name: [null, Validators.required],
      region: [null, Validators.required],
      mainFile: [null, Validators.required],
      thumbnails: [null, Validators.required],
      withDescription: [false],
      description: [null]
    })
    this.resetForm()
  }

  onChanges(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        (event.target.id === 'secondFile') ? this.imgSrcThumbnails = e.target.result : this.imgSrcMain = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      (event.target.id === 'secondFile') ? this.selectedThumbnailsImg = event.target.files[0] : this.selectedMainImg = event.target.files[0]
    } else {
      this.selectedMainImg = this.selectedThumbnailsImg = null
      this.imgSrcThumbnails = this.imgSrcMain = this.imgPlaceholder
    }
  }

  async createNew() {
    if(this.form.invalid){
      return
    }
    this.isLoading = true;

    const newItem: NewItem = {
      name: this.form.get('name').value,
      mainImg: null,
      thumbnail: null,
      description: this.form.get('description').value,
      date: new Date()
    }

    let mainPath = `${this.form.get('region').value}/${this.selectedMainImg.name}_${new Date().getTime()}`
    let thumbNail = `${this.form.get('region').value}/${this.selectedThumbnailsImg.name}_${new Date().getTime()}`

    await this.storage.upload(mainPath, this.selectedMainImg);
    await this.storage.upload(thumbNail, this.selectedThumbnailsImg);

    // try {
    //   const el = await this.storage.ref(mainPath).getDownloadURL().toPromise()
    //   newItem.mainImg = el
    //   return this.storage.ref(thumbNail).getDownloadURL().toPromise()
    // } catch (e) {
    //
    // }

    await this.storage.ref(mainPath).getDownloadURL().toPromise()
      .then(el => {
        newItem.mainImg = el
        return this.storage.ref(thumbNail).getDownloadURL().toPromise()})
      .then(el => newItem.thumbnail = el)

      // Sending data to DB
    this.createSub = this.restServise.create(newItem, this.form.get('region').value)
      .subscribe(resp => {
        this.isLoading = false
        this.resetForm()
        this.router.navigate(['/admin', 'dashboard'])
        this.alert.success(`Юху! Ще одна рибка в сітці!`)
      })
  }

  resetForm(){
    this.form.reset()
    this.imgSrcMain = this.imgPlaceholder
    this.imgSrcThumbnails = this.imgPlaceholder
  }

  ngOnDestroy(): void {
    if(this.createSub){
      this.createSub.unsubscribe()
    }
  }


}
