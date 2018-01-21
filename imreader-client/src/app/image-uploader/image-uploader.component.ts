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
  api: string;

  constructor(private imageOcrService: ImageOcrService) { 
    this.api = 'handwriting';
  }

  ngOnInit() {
  }

  imageUrl: String = environment.imageUrl;

  onUploadFinished(event: any) : void {
    this.imageOcrService.subject.next(event);
  }

  onBeforeUpload = (metadata: UploadMetadata) => {
    console.debug("upload Image: %s", metadata.url);
    metadata.formData = {
      api: this.api
    };
    this.imageOcrService.subject.next(metadata);
    return metadata;
  };

  setApi(api: string) {
    this.api = api;
  }

}
