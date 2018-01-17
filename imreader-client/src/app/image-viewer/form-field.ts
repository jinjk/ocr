declare var jquery: any;
declare var $: any;

export class FormField {
    id: string;
    title: string;
    text: string;
    x: number;
    y: number;
    titleWidth: number;
    width: number;
    height: number;
    hidden: boolean;
    initiated: boolean = false;

    constructor(id: string) {
        this.id = id;
    }

    init(x: number, y: number) {
        if (!this.initiated) {
            this.initiated = true;

            let element = $(`#${this.id}`);
            let coord = this.calcCoord(x, y);
            console.log("coord", coord);
            element
                .resizable({
                    minHeight: 150,
                    minWidth: 200
                })
                .draggable({ containment: "#table-container" })
                .css({
                    left: coord.left,
                    top: coord.top
                  });


        }
    }

    calcCoord(x: number, y: number):any {
        let pos = $("#svg-container").offset()
        console.log(pos, x, y);
        return {left: x - pos.left, top: y - pos.top};
    }
}