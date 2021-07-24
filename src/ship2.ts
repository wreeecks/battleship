import { Board2 } from "./board2";
import { Cell2, CellState, Direction } from "./models/cell2";

export class Ship2 {
    name: string;
    private shipLength: number;
    private shipOrientation: Direction ;
    private shipPosition: Cell2[] = [];

    constructor(name: string = "Thousand Sunny", shipLength: number = 4, orientation: Direction = Direction.Horizontal) {
        this.name = name;
        this.shipLength = shipLength;
        this.shipOrientation = orientation;
    }

    getShipLength(): number {
        return this.shipLength;
    }

    setShipPosition(cellRange: Cell2[]): void {
        this.shipPosition = cellRange;
    }

    getShipPosition(): Cell2[] {
        return this.shipPosition;
    }
    
    setOrientation(orientation: Direction): void {
        this.shipOrientation = orientation;
    }

    getOrientation(): Direction {
        return this.shipOrientation;
    }

    setShipDamage(cell: Cell2): void {
        
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
    getShipCellRangeOnBoard(board: Board2, startingPoint: Cell2): Cell2[] {
        return board.getCellRangeAddress(this.shipOrientation, startingPoint, this.shipLength);
    }
}