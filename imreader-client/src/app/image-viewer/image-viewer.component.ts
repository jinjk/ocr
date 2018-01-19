import { Component, OnInit, OnChanges, SimpleChanges, AfterViewChecked, Input } from '@angular/core';
import { ImageOcrService } from '../services/image-ocr.service';
import { FieldFilterPipe } from '../pipes/field-filter.pipe'
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
  @Input() formData: any;
  tableElements = {};
  magnificationX: number = 1;
  magnificationY: number = 1.2;
  keys: string[] = [];
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
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("viewer data", this.viewerData);
    this.action = Action.editText;
    this.viewInitiated = false;
  }

  private viewInitiated = false;

  ngAfterViewChecked() {
    if (!this.viewInitiated) {
      this.initView();
      this.viewInitiated = true;
    }

    if (this.action == Action.editTable) {
      for(let key in this.tableElements) {
        this.tableElements[key].show();
      }
    }
    else {
      for(let key in this.tableElements) {
        this.tableElements[key].hide();
      }
    }
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
        let formField = new FormField(key, this.pageX, this.pageY, this);
        this.tableElements[key] = formField;
        this.keys = Object.keys(this.tableElements);
      }
    });

    $("svg").click((event) => {
      $("#cell_input").hide();
    });
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

  filter(keys: any[]) {

  }

  private __drawTable() {
    console.log("draw table ...")
    $("#table-container").show();
    $("#table-container")
      .width($("svg").width() - 20)
      .height($("svg").height() - 20);

    var $contextMenu = $("#contextMenu");

    $(".table-root").on("contextmenu", e => {
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
    actualWidth = Math.ceil(actualWidth * this.magnificationX); actualHeight = Math.ceil(actualHeight * this.magnificationY);
    this.svg.width = actualWidth;
    this.svg.height = actualHeight;
  }

  public getOriginalCoord(coord: any): any {
    let vWidth = $("svg").width();
    let ratio = this.svg.width / vWidth;
    let newCoord = {
      x: coord.x * ratio / this.magnificationX ,
      y: coord.y * ratio / this.magnificationY,
      width: coord.width * ratio / this.magnificationX,
      height: coord.height * ratio / this.magnificationY
    }
    console.log("newCoord", coord);
    return newCoord;
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

  viewData(str: string) {
    console.log(this.viewerData);
    console.log(str);
  }
}
