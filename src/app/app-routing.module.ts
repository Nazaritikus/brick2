import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {MainGalleryPageComponent} from './main-gallery-page/main-gallery-page.component';
import {ContactsPageComponent} from './contacts-page/contacts-page.component';
import {UkrMapPageComponent} from './ukr-map-page/ukr-map-page.component';
import {WorldMapPageComponent} from './world-map-page/world-map-page.component';
import {InnerGalleryPageComponent} from './inner-gallery-page/inner-gallery-page.component';
import {ItemsPageComponent} from './items-page/items-page.component';


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', component: MainGalleryPageComponent},
      {path: 'contacts', component: ContactsPageComponent},
      {path: 'ukr', component: UkrMapPageComponent},
      {path: 'world', component: WorldMapPageComponent},
      {path: 'gallery/:regionName', component: InnerGalleryPageComponent},
      {path: 'gallery/:regionName/:id', component: ItemsPageComponent},
      {path: '', redirectTo: '/', pathMatch: 'full'}
    ]},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
