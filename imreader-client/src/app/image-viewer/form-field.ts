import { ImageViewerComponent } from "./image-viewer.component";

declare var jquery: any;
declare var $: any;

export class FormField {
    id: string;
    element: any;
    formData: any;
    viewerData: any;
    pageX: number;
    pageY: number;

    fieldData = null;
    initiated: boolean = false;
    ratio = 1;

    constructor(id: string, x: number, y: number, private viewComp: ImageViewerComponent) {
        this.id = id;
        this.formData = viewComp.formData;
        if (this.formData[id] != null) {
            this.fieldData = this.formData[id];
        }
        this.viewerData = viewComp.viewerData;
        this.pageX = x;
        this.pageY = y;
    }

    show() {
        if (!this.initiated) {
            this.initiated = true;
            let coord = null;
            if (this.fieldData == null) {
                coord = this.calcCoord(this.pageX, this.pageY);

            }
            else {
                coord = this.fieldData['container'].coord;
            }
            this.element = $(`#${this.id}`);

            this.element
                .resizable()
                .draggable({ containment: "#table-container" })
                .css({
                    left: coord.x,
                    top: coord.y
                });
            this.element.children(".field-title").resizable({
                handles: 'e, w'
            });

            this.element.keydown(event => {
                if (event.which == 13) {
                    this.__updateFormModelAndViewModel();
                }
            });

            if (this.fieldData != null) {
                this.element.css({width: coord.width, height: coord.height});
                let width = this.fieldData['title'].width;
                let text = this.fieldData['title'].text;
                this.element.children(".field-title").css({width: width});
                this.element.find("> .field-title > input").val(text);
            }
        }

        this.element.show();
    }

    public hide() {
        this.element.hide();
    }

    private __updateFormModelAndViewModel() {
        let pos = this.element.position();
        let coord = { x: pos.left, y: pos.top, width: this.element.width(), height: this.element.height() };
        let container = {};
        let title = {};
        let text = {};
        container['coord'] = coord;
        title['text'] = this.element.find("> .field-title > input").val();
        title['width'] = this.element.children(".field-title").width();
        let textEle = this.element.children(".field-text");
        let textCoord = { x: textEle.position().left + coord.x, y: textEle.position().top + coord.y, width: textEle.width(), height: textEle.height() };
        text['coord'] = textCoord;
        this.fieldData = {};
        this.formData[this.id] = this.fieldData;
        this.fieldData['container'] = container;
        this.fieldData['title'] = title;
        this.fieldData['text'] = text;

        this.__updateViewModel(textCoord);
    }

    private __updateViewModel(coord: any) {
        coord = this.viewComp.getOriginalCoord(coord);
        let data = this.viewerData.data;
        let x0 = coord.x, y0 = coord.y, x1 = coord.x + coord.width, y1 = coord.y + coord.height;
        let items = [];
        for (let item of data.items) {
            let coord = item.itemcoord;
            let string = item.itemstring;
            let words = item.words;
            if (coord.x > x0 && coord.y > y0 && coord.x < x1 && coord.y < y1) {
                items.push(item);
            }
        }
        items.sort((a, b) => {
            return a.itemcoord.x - b.itemcoord.x;
        })
        let first = null;
        if (items.length > 0) {
            first = items[0];
        }
        items.forEach((item, index) => {
            if (index > 0) {
                $.merge(first.words, item.words);
                first.itemstring = first.itemstring + " " + item.itemstring;
                first.itemcoord.width += item.itemcoord.width;
                first.itemcoord.width += 4;
                let i = data.items.indexOf(item);
                if (i > -1) {
                    data.items.splice(i, 1);
                }
            }
        })

    }

    calcCoord(x: number, y: number): any {
        console.log(x, y);
        let pos = $("#svg-container").offset()
        return { x: x - pos.left, y: y - pos.top };
    }
}