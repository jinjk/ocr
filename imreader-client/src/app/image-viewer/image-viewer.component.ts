import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, Input } from '@angular/core';
import { ImageOcrService } from '../services/image-ocr.service';
declare var jquery: any;
declare var $: any;


export enum Action {
  editTable = 0,
  editText = 1
};

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() viewerData: any;
  @Input() loading: boolean;

  /**
   * action is used to specify the text view editing status
   * if action is 'editTable' then tableView will be activated, otherwise,
   * if action is 'editText', text content editing will be enabled.
   */
  action: Action;
  Action = Action;
  svg = {
    x: -10, y: -10, width: 0, height: 0,
    toViewBox: () => {
      return `${this.svg.x} ${this.svg.y} ${this.svg.width} ${this.svg.height}`;
    }
  };
  editingItem: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initView();
  }

  ngAfterViewInit() {
    $("svg").click((event) => {
      $("#cell_input").hide();
    });
  }

  public initView() {
    this.action = Action.editText;
    $("#cell_input").hide();
  }

  enableEditingTable() {

  }

  imageLoad() {
    let $img = $("#preview");
    let h = $img.height(), w = $img.width()
    $img.removeAttr('width').removeAttr('height')
    let actualHeight = $img.height(), actualWidth = $img.width()
    $img.attr({ height: h, width: w }).data({ height: actualHeight, width: actualWidth })
    actualWidth = Math.ceil(actualWidth * 1.2); actualHeight = Math.ceil(actualHeight * 1.2);
    this.svg.width = actualWidth;
    this.svg.height = actualHeight;
  }

  editText(event, item) {
    event = $.event.fix(event);
    event.stopPropagation();
    let text = $(event.target);
    this.editingItem = item;
    let coor = text.offset();
    let top = coor.top, left = coor.left, width = item.itemcoord.width;

    $("#cell_input").show();
    $("#cell_input").offset({ top: top, left: left });
    $("#cell_input").width(width + Math.sqrt(width) * 1.8);
    $("#cell_input > input").val(item.itemstring);
    $("#cell_input > input").focus();
  }

  updateField(event) {
    let keyCode: number = event.keyCode;
    if (keyCode == 13) {
      this.editingItem.itemstring = $("#cell_input > input").val();
      $("#cell_input").hide();
    }
  }
}
