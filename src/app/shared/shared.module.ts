import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BgControlDirective } from './directives/bg-control.directive';
import {QuillModule} from 'ngx-quill';
import { LoadingComponent } from './components/loading/loading.component';
import {SearchPipe} from './search.pipe';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],        // toggled buttons
          ['blockquote'],

          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent


          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['link', 'image', 'video']                         // link and image, video
        ]
      }
    })
  ],
    exports: [
        HttpClientModule,
        FormsModule,
        QuillModule,
        LoadingComponent,
        SearchPipe,
        BgControlDirective
    ],
  declarations: [
    BgControlDirective,
    LoadingComponent,
    SearchPipe
  ]
})
export class SharedModule {

}
