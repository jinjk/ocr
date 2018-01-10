import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ImageOcrService {
  public subject: Subject<any>;

  constructor(private http: HttpClient) {
    this.subject = new Subject();
  }

  imageSent(callback: Function): void {
    this.subject.subscribe({
      next: (v) => callback(v)
    })
  }

  getSample(id: string): Observable<any> {
    console.log(`${environment.sampleUrl}/${id}`);
    return this.http.get<any>(`${environment.sampleUrl}/${id}`);
  }
}
