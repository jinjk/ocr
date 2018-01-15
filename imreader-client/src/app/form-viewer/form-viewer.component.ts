import { Component, OnInit } from '@angular/core';
import { ImageOcrService } from '../services/image-ocr.service';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.css']
})
export class FormViewerComponent implements OnInit {
  viewerData: any;

  constructor(private imageOcrService: ImageOcrService) { }

  ngOnInit() {
    this.imageOcrService.imageSent((event: any) => {
      this.viewerData = {
        imageSrc: event.src,
        data: event.serverResponse.json().data
      }
    });
    this.imageOcrService.beginSent((obj: any) => {
    });
  }
  
}
