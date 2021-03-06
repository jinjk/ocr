import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ImageUploadModule } from "angular2-image-upload";


import { AppComponent } from './app.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageOcrService } from './services/image-ocr.service';
import { SampleComponent } from './sample/sample.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';
import { FieldFilterPipe } from './pipes/field-filter.pipe'

const appRoutes: Routes = [
  { path: '', component: FormViewerComponent },
  { path: 'sample', component: SampleComponent },
  { path: '**',   redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ImageViewerComponent,
    ImageUploaderComponent,
    SampleComponent,
    FormViewerComponent,
    FieldFilterPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ImageUploadModule.forRoot()
  ],
  providers: [ImageOcrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
