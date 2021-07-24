import { Board } from "./board";
import { Cell, CellState, Direction } from "./models/cell";

export class Ship {
    name: string;
    private shipLength: number;
    private shipOrientation: Direction ;
    private shipPosition: Cell[] = [];

    constructor(name: string = "Thousand Sunny", shipLength: number = 4, orientation: Direction = Direction.Horizontal) {
        this.name = name;
        this.shipLength = shipLength;
        this.shipOrientation = orientation;
    }

    getShipLength(): number {
        return this.shipLength;
    }

    setShipPosition(cellRange: Cell[]): void {
        this.shipPosition = cellRange;
    }

    getShipPosition(): Cell[] {
        return this.shipPosition;
    }
    
    setOrientation(orientation: Direction): void {
        this.shipOrientation = orientation;
    }

    getOrientation(): Direction {
        return this.shipOrientation;
    }

    setShipDamage(cell: Cell): void {
        
        const ship = this.shipPosition.find(c => c.gridRow === cell.gridRow && c.gridCol === cell.gridCol);
        
        if(!ship) throw("Unable to set damage.");

        if(ship){
            // tslint:disable-next-line:no-console
            console.log("HIT!")
            ship.cellState = CellState.Hit;

            if(this.isDestroyed()){
                // tslint:disable-next-line:no-console
                console.log(`${this.name} sunked`);
            }    
        }

    }

    /**
     * Checks if there are remaining occupied cells
     * @returns boolean 
     */
    isDestroyed(): boolean {
        return (this.shipPosition.filter(c => c.cellState === CellState.Occupied).length === 0);
    }

    /**
     * Returns the ship cell consumption on the board
     * @param board target board
     * @param startingPoint starting cell position
     * @returns array of the target board cells.
     */
    getShipCellRangeOnBoard(board: Board, startingPoint: Cell): Cell[] {
        return board.getCellRangeAddress(this.shipOrientation, startingPoint, this.shipLength);
    }
}