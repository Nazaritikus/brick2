import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { MainGalleryPageComponent } from './main-gallery-page/main-gallery-page.component';
import { InnerGalleryPageComponent } from './inner-gallery-page/inner-gallery-page.component';
import { UkrMapPageComponent } from './ukr-map-page/ukr-map-page.component';
import { WorldMapPageComponent } from './world-map-page/world-map-page.component';
import { ItemsPageComponent } from './items-page/items-page.component';
import {SharedModule} from './shared/shared.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './shared/services/auth.interceptor';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { ItemCardComponent } from './item-card/item-card.component';

const INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ContactsPageComponent,
    MainGalleryPageComponent,
    InnerGalleryPageComponent,
    UkrMapPageComponent,
    WorldMapPageComponent,
    ItemsPageComponent,
    PageBannerComponent,
    ItemCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
