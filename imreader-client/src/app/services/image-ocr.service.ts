import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ImageOcrService {
  public subject: Subject<any>;
  
  constructor(private http: HttpClient) {
    this.subject = new Subject();
  }

  imageSent(callback: Function) : void {
    this.subject.subscribe({
      next: (v) => callback(v)
    })
  }
}
