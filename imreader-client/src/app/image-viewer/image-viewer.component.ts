import { Component, OnInit, OnChanges, SimpleChanges, AfterViewChecked, Input } from '@angular/core';
import { ImageOcrService } from '../services/image-ocr.service';
import { FormField } from './form-field';
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
export class ImageViewerComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() viewerData: any;
  @Input() loading: boolean;
  tableElements = new Map<string, FormField>();
  magnificationX: number = 1;
  magnificationY: number = 1.2;
  keys: string[];
  pageX: number;
  pageY: number;

  /**
   * action is used to specify the text view editing status
   * if action is 'editTable' then tableView will be activated, otherwise,
   * if action is 'editText', text content editing will be enabled.
   */
  action: Action = Action.editText;
  Action = Action;
  svg = {
    x: 0, y: 0, width: 0, height: 0,
    toViewBox: () => {
      return `${this.svg.x} ${this.svg.y} ${this.svg.width} ${this.svg.height}`;
    }
  };
  editingItem: any;
  constructor() { }

  ngOnInit() {
    console.log("on init");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("on changes");
    this.action = Action.editText;
    this.viewInitiated = false;
  }

  private viewInitiated = false;

  ngAfterViewChecked() {
    console.log("after view checked");
    if(! this.viewInitiated) {
      this.initView();
    }
    this.viewInitiated = true;
  }

  initView() {
    console.log("init view ...")
    $("#cell_input").hide();
    $("#table-container")
      .hide()
      .draggable({ containment: "parent" })
      .resizable();

    var $contextMenu = $("#contextMenu");
    $contextMenu.on("click", "a", function () {
      $contextMenu.hide();
    });

    $('a').click(e => {
      e.preventDefault();
      if ($(e.target).data('action') == 'lock') {
        $("#table-container").draggable({ disabled: true });
        $("#table-container").resizable({ disabled: true });
      }
      else if ($(e.target).data('action') == 'unlock') {
        $("#table-container").draggable({ disabled: false });
        $("#table-container").resizable({ disabled: false });
      }
      else if ($(e.target).data('action') == 'newField') {

        let key = String(Date.now());
        let formField = new FormField(key);
        this.tableElements.set(key, formField);
        let iter = this.tableElements.keys();
        this.keys = [];
        for (let k of iter) {
          this.keys.push(k);
        }
      }
    });

    $("svg").click((event) => {
      $("#cell_input").hide();
    });
  }

  initField(id: string) {
    console.log("init filed" + id);
    this.tableElements.get(id).init(this.pageX, this.pageY);

  }

  selectLayer(layer: string) {
    if (layer == 'table') {
      this.action = Action.editTable;
      this.__setSelectable(false);
      $("svg > * > text").attr("class", "svg-text-underline");
      this.__drawTable();
    }
    else if (layer == 'svg') {
      this.action = Action.editText;
      this.__setSelectable(true);
      $("svg > * > text").attr("class", "svg-text");
      $("#table-container").hide();
    }
  }

  private __drawTable() {
    console.log("draw table ...")
    $("#table-container").show();
    $("#table-container")
      .width($("svg").width() - 20)
      .height($("svg").height() - 20);

    var $contextMenu = $("#contextMenu");

    $(".table-element").on("contextmenu", e => {
      this.pageX = e.pageX;
      this.pageY = e.pageY;
      $contextMenu.css({
        display: "block",
        left: e.pageX,
        top: e.pageY
      });
      return false;
    });
  }

  private __setSelectable(enabled: boolean) {
    $("svg").mousedown(event => {
      return enabled;
    });
  }

  imageLoad() {
    let img = $("#preview")[0];

    let actualHeight = img.naturalHeight, actualWidth = img.naturalWidth;
    console.log({width: actualWidth, height: actualHeight});
    actualWidth = Math.ceil(actualWidth * this.magnificationX); actualHeight = Math.ceil(actualHeight * this.magnificationY);
    this.svg.width = actualWidth;
    this.svg.height = actualHeight;
  }
/*
  private __maxXY(data: any): any {
    let items = data.data.items;
    let x = 0, y = 0;
    for (let item of items) {
      let coord = item.itemcoord;
      if (x < coord.x + coord.width) {
        x = coord.x + coord.width;
      }
      if (y < coord.y + coord.height) {
        y = coord.y + coord.height;
      }
    }
    return {x: x, y: y};
  }
*/
  editText(event, item) {
    if (this.action == Action.editTable) {
      return;
    }

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
