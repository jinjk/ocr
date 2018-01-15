import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ImageOcrService } from '../services/image-ocr.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit, AfterViewInit {
  @Input() viewerData: any;
  @Input() loading: boolean;
  editingItem: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $("#cell_input").hide();
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

  editText(event, item) {
    let text = $(event.target);
    this.editingItem = item;
    let coor = text.offset();
    let top = coor.top;
    let left = coor.left;
    $("#cell_input").show();
    $("#cell_input").offset({top: top, left: left});
    $("#cell_input").width(item.itemcoord.width * 1.5);
    $("#cell_input > input").val(item.itemstring);
  }

  updateField(event) {
    let keyCode: number = event.keyCode;
    if (keyCode == 13) {
      this.editingItem.itemstring = $("#cell_input > input").val();
      $("#cell_input").hide();
    }
    if (keyCode == 27) {
      $("#cell_input").hide();
    }
  }
  
}
