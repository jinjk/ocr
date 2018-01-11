import { Component, OnInit } from '@angular/core';
import { ImageOcrService } from '../services/image-ocr.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
  data: any;
  imageSrc: string;

  constructor(private imageOcrService: ImageOcrService) { }

  ngOnInit() {
    this.imageOcrService.imageSent((event: any) => {
      this.imageSrc = event.src;
      this.data = event.serverResponse.json();
    });
    this.imageOcrService.beginSent((obj: any) => {
    });
  }

  imageLoad() {
    var $img = $("#preview");
    var h=$img.height(),w=$img.width()
    $img.removeAttr('width').removeAttr('height')
    var actualHeight =$img.height(),actualWidth=$img.width()
    $img.attr({height:h,width:w}).data({height: actualHeight, width: actualWidth})
    console.log(actualHeight,actualWidth);
    $("svg").attr("viewBox", `0 0 ${actualWidth * 1.2} ${actualHeight * 1.2}`);
  }

  
}
