import { Board } from "./Board";
import { Cell } from './models/cell';
import { shipOrientation } from "./models/enumShipOrientation";

export class Ship {
    name: string;
    shipLength: number;
    shipOrientation: shipOrientation ;
    shipPosition: Cell[] = [];
    shipDamage: Cell[] = [];
    isDestroyed: boolean = false;

    constructor(name: string = "Rengoku", shipLength: number = 4, orientation: shipOrientation = shipOrientation.Horizontal) {
        this.name = name;
        this.shipLength = shipLength;
        this.shipOrientation = orientation;
    }

    setShipPosition(cellRange: Cell[]) : void {
        this.shipPosition = cellRange;
    }

    getShipPosition(){
        return this.shipPosition;
    }

    removeShipFromBoard(board: Board){
        board.freeCell(this.getShipPosition());
        this.setShipPosition([]);
    }

    setOrientation(orientation: shipOrientation){
        this.shipOrientation = orientation;
    }

    setShipDamage(cell: Cell){
        this.shipDamage.push(cell);
        // tslint:disable-next-line:no-console
        console.log("HIT!")

        if(this.shipPosition.length === this.shipDamage.length) {
            this.isDestroyed = true;
            // tslint:disable-next-line:no-console
            console.log(`${this.name} destroyed!`);
        }
    }

    /**
     * Returns  the ship cell consumption
     * @param board target board
     * @param startCell starting cell position
     * @returns array of the target board cells.
     */
    getShipCellRangeOnBoard(board: Board, startCell: Cell) : Cell[] {
        if(this.shipOrientation === shipOrientation.Horizontal){
            return this.getHorizontalCellRange(board, startCell, this.shipLength);
        }

        if(this.shipOrientation === shipOrientation.Vertical){
            return this.getVerticalCellRange(board, startCell, this.shipLength);
        }
    }

    /**
     * Returns board's array of cells from the startCell until the end of range.
     *
     * @param startCell  start of range
     * @param numberOfCells  number of cells to return
     * @returns array of cells
     */
    private getHorizontalCellRange(board: Board, startCell: Cell, numberOfCells: number) : Cell[] {

        const grid = board.getGrid();
        const rangeStart = startCell.gridCol;
        const rangeEnd =  startCell.gridCol + (numberOfCells - 1);

        const cells = grid.filter(
                            c => c.gridRow === startCell.gridRow
                            && c.gridCol >= rangeStart
                            && c.gridCol <= rangeEnd
                        );

        if(cells.length !== numberOfCells) {
            throw Error("out of board's range");
        }

        return cells;
    }


    /**
     * Returns board's array of cells from the startCell until the end of range.
     *
     * @param board  target board
     * @param startCell  start of range
     * @param numberOfCells  number of cells to return
     * @returns array of cells
     */
     private getVerticalCellRange(board: Board, startCell: Cell, numberOfCells: number): Cell[] {
        const grid = board.getGrid();
        const rangeStart = startCell.gridRow;
        const rangeEnd =  startCell.gridRow + (numberOfCells - 1);

        const cells = grid.filter(
                            c => c.gridCol === startCell.gridCol
                            && c.gridRow >= rangeStart
                            && c.gridRow <= rangeEnd
                        );

        if(cells.length !== numberOfCells) {
            throw Error("out of board's range");
        }

        return cells;
    }
}