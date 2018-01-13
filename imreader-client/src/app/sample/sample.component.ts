import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ImageOcrService } from '../services/image-ocr.service';
import { environment } from '../../environments/environment';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  ocrSample: any;
  baseUrl = environment.baseUrl;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ImageOcrService
  ) { }

  ngOnInit() {
    Observable.combineLatest(this.route.paramMap, this.route.queryParamMap, 
      (params, qparams) => { return { params, qparams }})
      .switchMap((mp) => {
        this.ocrSample = null;
        return this.service.getSample(mp.params.get('id'), mp.qparams.get('api'));
      })
      .subscribe(data => {this.ocrSample = data});
  }

  imageLoad() {
    var $img = $("#preview");
    var h=$img.height(),w=$img.width()
    $img.removeAttr('width').removeAttr('height')
    var actualHeight =$img.height(),actualWidth=$img.width()
    $img.attr({height:h,width:w}).data({height: actualHeight, width: actualWidth})
    console.debug(actualHeight,actualWidth);
    $("svg").attr("viewBox", `-10 -10 ${actualWidth * 1.2} ${actualHeight * 1.2}`);
  }

}
