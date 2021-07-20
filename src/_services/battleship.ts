import { Cell } from "../_models/cell";
import { Ship, shipOrientation } from "../_entities/ship";

export class Battleship {
    rows: number;
    cols: number;
    grid: Cell[] = [];
    ships: Ship[] = [];
    shipsPostition: Ship[] = [];

    constructor(row: number = 10, cols: number = 10) {
        this.rows = row;
        this.cols = cols;
    }

    startGame(){
        this.createBoard(this.rows, this.cols);
        this.shipsPostition = [];
    }

    /**
     * Create Game Board 
     * @param rows board total rows, default is 10.
     * @param cols board total columns, default is 10.
     */
    createBoard(rows: number, cols: number) : void {

        this.grid = [];
        
        for(let r=0; r<=rows; r++){
            for(let c=0; c<=cols; c++)
            {   
                const cell: Cell = <Cell>{
                    gridRow: r,
                    gridCol: c,
                    isTaken: false,
                    isTicked: false
                };
                
                this.grid.push(cell);
            }
        }
    }

    createShip(name: string, size: number, shipOrientation: shipOrientation): Ship {
        const ship = new Ship();
        ship.name = name;
        ship.shipLength = size;
        ship.shipOrientation = shipOrientation;
        return ship;
    }

    placeShip(ship: Ship, row: number, col: number) {
        let isValidPlacement = true;

        // check if the cell exist
        const cell = this.getGridCell(row, col);
        if(cell == undefined) return false;
        
        // check if the cell is taken 
        
        // inside boundary?
        const insideBoundary = this.isInsideBoard(ship, cell);
        console.log("insideBoundary ", insideBoundary);
        if(!insideBoundary) return false;

        // any collision?
        const collision = this.isColliding(ship, cell);
        console.log("collision", collision);
        if(collision) return false;

        cell.isTaken = true;

        return isValidPlacement;
    }

    /**
     * Is Inside Board
     * This will interpolate the last cell address and check if exists.
     * @param ship 
     * @param cell 
     * @returns boolean
     */
    isInsideBoard(ship: Ship, cell: Cell) : boolean {

        if(cell === undefined) return false;

        let lastCell: Cell | undefined;

        if(ship.shipOrientation === shipOrientation.Horizontal){
            let lastCellCol = cell.gridCol + ship.shipLength;
            lastCell = this.getGridCell(cell.gridRow, lastCellCol);
        }

        if(ship.shipOrientation === shipOrientation.Vertical){
            let lastCellRow = cell.gridRow + ship.shipLength;
            lastCell = this.getGridCell(lastCellRow, cell.gridCol);
        }

        return (lastCell) ? true : false;
    }

    /**
     * Is Colliding
     * This will iterate the ship's cell address and check if it's not yet taken. 
     * @param ship ship type
     * @param cell starting cell address
     * @returns boolean
     */
    isColliding(ship: Ship, cell: Cell) : boolean {
        
        // interpolate cell address
        let cellAddress = [];
        let start = 0;
        let end = 0;
        let cellsInRange: Cell[] | undefined;

        // ship direction and translate to cell address

        // get all the cells in the cell row
        if(ship.shipOrientation == shipOrientation.Horizontal){
            start = cell.gridCol;
            end = cell.gridCol + ship.shipLength;
            cellsInRange =  this.getCellRange(start, end, ship.shipOrientation, cell.gridRow); 

            console.log("rowCells",cellsInRange);
        }

        if(ship.shipOrientation == shipOrientation.Vertical){
            start = cell.gridRow;
            end = cell.gridRow + ship.shipLength;
            cellsInRange =  this.getCellRange(start, end, ship.shipOrientation, cell.gridCol); 

            console.log("colCells",cellsInRange);
        }

        if(cellsInRange){
            return (cellsInRange.filter(c => c.isTaken)?.length > 0);
        }
        return false;
    }


    /**
     * GetCellRange
     * This will return a array of Cells.
     * @param start  start of range
     * @param end  end of range, this will deducted by 1 offset to match the array index.
     * @param direction Horizontal or Vertical
     * @param reference If direction is Horizontal, row index must be provided. 
     *                  If direction is Vertical, column index must be prived.
     * @returns array of cells
     */
    getCellRange(start: number, end: number, direction: shipOrientation, reference: number)  : Cell[] | undefined {
        // add  index offset
        end--;
        
         // get all cells in the row
        if(direction == shipOrientation.Horizontal){
            return this.grid.filter(
                                c => c.gridRow == reference 
                                && c.gridCol >= start 
                                && c.gridCol <= end
                            );
        }

        // get all cells in the column
        if(direction == shipOrientation.Vertical){
            return this.grid.filter(
                                c => c.gridCol == reference 
                                && c.gridRow >= start
                                && c.gridRow <= end
                            );
        }

    }
    

    /**
     * Is Cell Takem
     * Checks if the cell is already in use.
     * @param row Board row number
     * @param col Board column number
     */
    isCellTaken(row: number, col: number): boolean {
        let cell = this.getGridCell(row,col);
        
        if(cell == undefined) {
            console.error("cell not found"); 
            return false;
        }

        return cell.isTaken;
    }

    /**
     * Occupy Cell
     * Flag cell as taken
     * @param cell 
     * @returns 
     */
    occupyCell(cell: Cell): void {
        if(cell == undefined) {
            console.error("cell not found");
            return; 
        }
        cell.isTaken = true;
    }


    /**
     * Tick Cell
     * Used when the user guess a cell, this flags the cell as "ticked".
     * @param row Board row number
     * @param col Board column number
     */
    tickCell(row: number, col: number): void {
        let cell = this.getGridCell(row,col);
        
        if(cell == undefined) {
            console.error("cell not found"); 
            return;
        }

        if(cell.isTicked){
            console.error("cell is already ticked"); 
            return;
        }

        // update cell
        cell.isTicked = true;
    }


    /**
     * Is Cell Ticked
     * @param row Board row number
     * @param col Board column number
     * @returns boolean returns true if cell is ticked, otherwise false.
     */
    isCellTicked(row: number, col: number) : boolean {
        let cell = this.getGridCell(row,col);
        
        if(cell == undefined) {
            return false;
        }else{
            
            return cell.isTicked;
        }
    }

    /**
     * Get Grid Cell
     * @param row Board row number
     * @param col Board column number
     * @returns Cell or undefined if not found.
     */
    getGridCell(row: number, col: number): Cell | undefined{
        let cell = this.grid.find(c => c.gridRow == row && c.gridCol == col);
        
        if(cell){
            console.log(`cell[${row}][${col}] found`);
            return cell;
        }else{
            console.log(`cell[${row}][${col}] not found`);
            return undefined;
        }
    }
    
}