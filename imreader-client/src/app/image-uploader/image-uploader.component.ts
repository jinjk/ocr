import { Component, OnInit } from '@angular/core';
import { UploadMetadata } from "angular2-image-upload";
import { ImageOcrService } from '../services/image-ocr.service'

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  constructor(private imageOcrService: ImageOcrService) { }

  ngOnInit() {
  }

  imageUrl: String = "http://localhost:8080/imreader/api/v0.1/image";

  onUploadFinished(event: any) : void {
    this.imageOcrService.subject.next(event.serverResponse.json());
  }

  onBeforeUpload = (metadata: UploadMetadata) => {
    console.log(metadata)
    return metadata;
  };

}
