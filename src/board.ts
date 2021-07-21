
import { Cell } from "./cell";
import { shipOrientation } from "./_models/enumShipOrientation";

export class Board {
    private rows: number;
    private cols: number;
    private grid: Cell[] = [];

    constructor(rows: number = 10, cols: number = 10)  {    
        this.setBoardSize(rows, cols);
        this.createBoard();
    }

    /**
     * Set Board Size
     * @param rows must be more than 0, defaults to 10.
     * @param cols must be more than 0, defaults to 10. 
     */
    setBoardSize(rows: number, cols: number) : void {
        if(rows <= 0 || cols <= 0 ) {
            throw new Error("row and column size must be more than 0");
        }else{
            this.rows = rows;
            this.cols = cols;
        }
    }

    /**
     * Create Game Board 
     * This will refer to the row and col size. 
     */
     createBoard() : void {
        const totalRows = this.rows;
        const totalCols = this.cols;
        this.grid = []; // reset grid
        
        for(let rowIndex = 0; rowIndex < totalRows; rowIndex++){
            for(let colIndex = 0; colIndex < totalCols; colIndex++)
            {   
                const cell = new Cell(rowIndex, colIndex);
                this.grid.push(cell);
            }
        }
    }

    /**
     * Get Board Grid
     * @returns Array of Cells
     */
     getGrid() : Cell[] {
        return this.grid;
    }

    /**
     * 
     * @returns Get Total Rows
     * Returns board's total number of rows
     */
    getTotalRows() : number {
        return this.rows;
    }

    /**
     * 
     * @returns Get Total Cols
     * Returns board's total number of columns
     */
    getTotalCols() : number {
        return this.cols;
    }

    /**
    * Get Grid Cell
    * @param row Board row number
    * @param col Board column number
    * @returns Cell or undefined if not found.
    */
    getGridCell(row: number, col: number): Cell | undefined {
       let cell = this.grid.find(c => c.gridRow == row && c.gridCol == col);
       
       if(cell){
           console.info(`cell[${row}][${col}] found`);
           return cell;
       }else{
           console.info(`cell[${row}][${col}] not found`);
           return;
       }
    }

    /**
     * Get Horizontal Cell Range
     * Returns board's array of cells from the startCell until the end of range. 
     *
     * @param startCell  start of range
     * @param numberOfCells  number of cells to return
     * @returns array of cells
     */
    getHorizontalCellRange(startCell: Cell, numberOfCells: number) : Cell[] {

        const rangeStart = startCell.gridCol;
        const rangeEnd =  startCell.gridCol + (numberOfCells - 1);

        const cells = this.grid.filter(
                            c => c.gridRow == startCell.gridRow 
                            && c.gridCol >= rangeStart 
                            && c.gridCol <= rangeEnd
                        );
        
                        if(cells.length !== numberOfCells) {
            throw Error("out of board's range");
        }
        
        return cells;
    }


    /**
     * Get Vertical Cell Range
     * Returns board's array of cells from the startCell until the end of range. 
     *
     * @param startCell  start of range
     * @param numberOfCells  number of cells to return
     * @returns array of cells
     */
     getVerticalCellRange(startCell: Cell, numberOfCells: number) : Cell[] {

        const rangeStart = startCell.gridRow;
        const rangeEnd =  startCell.gridRow + (numberOfCells - 1);

        const cells = this.grid.filter(
                            c => c.gridCol == startCell.gridCol 
                            && c.gridRow >= rangeStart 
                            && c.gridRow <= rangeEnd
                        );

        if(cells.length !== numberOfCells) {
            throw Error("out of board's range");
        }
        
        return cells;
    }

    /**
     * Is Cell In Use
     * Checks if the cell address is already in use.
     * @param row Board row number
     * @param col Board column number
     * @returns boolean
     */
    isCellInUse(row: number, col: number): boolean {
        let cell = this.getGridCell(row,col);
        
        if(!cell) {
            console.error("cell not found"); 
            return false;
        }

        return cell.isInUse;
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
     * Occupy Cell
     * Mark the cell in use.
     * @param cells 
     */
    occupyCell(cells: Cell[]) : void {
        cells.forEach(cell => {
            cell.isInUse = true;
        });
    }

    
}