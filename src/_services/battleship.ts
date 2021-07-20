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
        console.log(this.grid);
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
        if(!insideBoundary) return false;

        // any collision?
        const collision = this.isColliding(ship, cell);
        if(collision) return false;

        return isValidPlacement;
    }

    isInsideBoard(ship: Ship, cell: Cell) : boolean {

        if(cell == undefined) return false;

        if(ship.shipOrientation === shipOrientation.Horizontal){
            console.log("X - ship total length", cell.gridCol + ship.shipLength)
            console.log("board boundary", this.cols);
            if(cell.gridCol + ship.shipLength > this.cols) return false;
        }

        if(ship.shipOrientation === shipOrientation.Vertical){
            console.log("Y - ship total length", cell.gridCol + ship.shipLength)
            console.log("board boundary", this.cols);
            if(cell.gridRow + ship.shipLength > this.rows) return false;
        }

        return true;
    }

    isColliding(ship: Ship, cell: Cell) : boolean {
        // check cell start cell;
        // iterate ships positions 

        // ship direction and translate to cell address
        if(ship.shipOrientation == shipOrientation.Horizontal){
            // take cell column number and add length, check if outside the boundary
        }else{
            // take cell row number and add length, check if outside the boundary
        }

        // interpolate cell address
        const cellAddress = [];

        if(ship.shipOrientation === shipOrientation.Horizontal){
            for(let c=cell.gridCol; c < cell.gridRow + ship.shipLength; c++ ){
                cellAddress.push(c);
            }
        }

        if(ship.shipOrientation === shipOrientation.Vertical){
            for(let r=cell.gridCol; r < cell.gridRow + ship.shipLength; r++ ){
                cellAddress.push(r);
            }
        }

        console.log('ship cell address', cellAddress);

    
        let shipCollition = this.shipsPostition.filter(ship => {
    //        ship.cells.find()
        });

        return false;
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