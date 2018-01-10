import { Component, OnInit } from '@angular/core';
import { UploadMetadata } from "angular2-image-upload";
import { ImageOcrService } from '../services/image-ocr.service'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  constructor(private imageOcrService: ImageOcrService) { }
  info: boolean = environment.production;

  ngOnInit() {
  }

  imageUrl: String = environment.imageUrl;

  onUploadFinished(event: any) : void {
    this.imageOcrService.subject.next(event);
  }

  onBeforeUpload = (metadata: UploadMetadata) => {
    console.log(metadata)
    return metadata;
  };

}
