import { Component, OnInit } from '@angular/core';
import { ImageOcrService } from '../services/image-ocr.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
  data: any;
  imageSrc: String;

  constructor(private imageOcrService: ImageOcrService) { }

  ngOnInit() {
    this.imageOcrService.imageSent((event: any) => {
      this.data = event.serverResponse.json();
      this.imageSrc = event.src;
    })
  }



}
