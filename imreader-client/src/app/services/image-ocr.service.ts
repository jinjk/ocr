import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UploadMetadata } from "angular2-image-upload";

@Injectable()
export class ImageOcrService {
  public subject: Subject<any>;
  public beforeUploadSubject: Subject<any>;

  constructor(private http: HttpClient) {
    this.subject = new Subject();
  }

  imageSent(callback: Function): void {
    this.subject.filter((obj: any, index: number) => {
      let cond = obj != null && obj.url != null;
      if (cond) {
        return false;
      }
      else {
        return true;
      }
    }).subscribe({
      next: (v) => callback(v)
    })
  }

  beginSent(callback: Function): any {
    this.subject.filter((obj: any, index: number) => {
      let cond = obj != null && obj.url != null;
      if (cond) {
        return true;
      }
      else {
        return false;
      }
    }).subscribe({ next: (v) => callback(v) })
  }

  getSample(id: string): Observable<any> {
    return this.http.get<any>(`${environment.sampleUrl}/${id}`);
  }
}
