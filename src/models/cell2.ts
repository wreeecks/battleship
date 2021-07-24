
export enum CellState {
    Open,
    Occupied,
    Hit,
    Miss
}

export enum Direction{
    Horizontal,
    Vertical
}

export class Cell2{
    gridRow: number;
    gridCol: number;
    cellState: CellState;

    constructor(gridRow: number, gridCol: number, cellState: CellState = null) {
        this.gridRow = gridRow;
        this.gridCol = gridCol;
        this.cellState = cellState;
    }
}

export interface CellRange{
    direction: Direction;
    start: number;
    end: number
}

export class CellRange implements CellRange {

}