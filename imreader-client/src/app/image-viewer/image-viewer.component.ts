import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ImageOcrService } from '../services/image-ocr.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit, OnChanges {
  @Input() viewerData: any;
  @Input() loading: boolean;
  editingItem: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initView();
  }

  public initView() {
    $("#cell_input").hide();
    $("svg").removeAttr("viewBox");
  }

  imageLoad() {
    let $img = $("#preview");
    let h = $img.height(), w = $img.width()
    $img.removeAttr('width').removeAttr('height')
    let actualHeight = $img.height(), actualWidth = $img.width()
    $img.attr({ height: h, width: w }).data({ height: actualHeight, width: actualWidth })
    console.debug(actualHeight, actualWidth);
    $("svg").attr("viewBox", `-10 -10 ${Math.ceil(actualWidth * 1.2)} ${Math.ceil(actualHeight * 1.2)}`);
  }

  editText(event, item) {
    let text = $(event.target);
    this.editingItem = item;
    let coor = text.offset();
    let top = coor.top;
    let left = coor.left;
    $("#cell_input").show();
    $("#cell_input").offset({ top: top, left: left });
    $("#cell_input").width(item.itemcoord.width * 1.5);
    $("#cell_input > input").val(item.itemstring);
    $("#cell_input > input").focus();
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
