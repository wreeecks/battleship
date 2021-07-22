export class Cell{
    gridRow: number;
    gridCol: number;
    isTicked: boolean = false;
    isInUse: boolean = false;

    constructor(gridRow: number, gridCol: number, isTicked?: boolean, isInUse?: boolean) {
        this.gridRow = gridRow;
        this.gridCol = gridCol;
    }
}