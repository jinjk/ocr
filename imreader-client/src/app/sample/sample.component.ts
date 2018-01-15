import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ImageOcrService } from '../services/image-ocr.service';
import { environment } from '../../environments/environment';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  viewerData: any;
  loading: boolean = false;
  baseUrl = environment.baseUrl;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ImageOcrService
  ) { }

  ngOnInit() {
    this.route.queryParamMap
      .switchMap((params: ParamMap) => {
        this.loading = true;
        return this.service.getSample(params.get('id'), params.get('api'));
      })
      .subscribe(data => {
        this.loading = false;
        this.viewerData = {
          imageSrc: this.baseUrl + data.imageUrl,
          data: data.ocr.data
        }
      });
  }

}
