import { TestBed, inject } from '@angular/core/testing';

import { ImageOcrService } from './image-ocr.service';

describe('ImageOcrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageOcrService]
    });
  });

  it('should be created', inject([ImageOcrService], (service: ImageOcrService) => {
    expect(service).toBeTruthy();
  }));
});
