import { ActionStatus, Result } from "./interfaces/actionResult";
import { ActionResult } from "./models/actionResult";
import { Cell, CellState, Direction } from "./models/cell";
import { BoardSizeError, CellRangeOutOfRangeError, InvalidCellError, UnableToUpdateCellError } from "./models/errors";

export class Board {
    private rows: number;
    private cols: number;
    private grid: CellState[][];

    constructor(rows: number = 10, cols: number = 10) {
        this.setBoardSize(rows, cols);
        this.createBoard();
    }

    /**
     * Set Board Size
     * @param rows must be more than 0, defaults to 10.
     * @param cols must be more than 0, defaults to 10.
     */
    private setBoardSize(rows: number, cols: number): void {
        if (rows <= 0 || cols <= 0)
            throw new BoardSizeError(rows, cols);

        this.rows = rows;
        this.cols = cols;
    }

    /**
     * Creates a multi dimension array cells
     */
    private createBoard(): void {
        const totalRows = this.rows;
        const totalCols = this.cols;
        this.grid = []; // reset grid

        for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            const rowColumns = [];

            for (let colIndex = 0; colIndex < totalCols; colIndex++) {
                rowColumns.push(CellState.Open);
            }
            
            this.grid.push(rowColumns);
        }
    }


    /**
     * Get the specified number of rows
     * @returns {number} 
     */
    getRows(): number {
        return this.rows;
    }

    /**
     * Get the specified number of columns
     * @returns {number} 
     */
    getCols(): number {
        return this.cols;
    }

    /**
     * Updates a board cell
     * @param {Cell} cellUpdate cell containing updates
     */
    private updateGrid(cellUpdate: Cell): void {
        const targetCell = this.getGridCell(cellUpdate.gridRow, cellUpdate.gridCol);
        
        if(targetCell){
            this.grid[targetCell.gridRow][targetCell.gridCol] = cellUpdate.cellState;
        }
    }

    /**
     * If the cell exists, return cell with state.
     * Otherwise, throw InvalidCellError
     * 
     * @param targetCell target cell
     * @returns Cell
     */
     getGridCell(row: number, col: number): Cell {
        
        if( typeof this.grid[row] === 'undefined' || typeof this.grid[row][col] === 'undefined')  {
            throw new InvalidCellError(row, col, "Cell not found");
        }
        
        return new Cell(row, col, this.grid[row][col]);
    }

    /**
     * Returns the current cell state
     * @param row grid row
     * @param col grid column
     * @returns CellState
     */
     getCellState(row: number, col: number): CellState {
        return this.getGridCell(row, col).cellState;
    }

    /**
     * verify the cell state.
     * @param cell target cell
     * @param cellState the state to compare to
     * @returns boolean
     */
    isCellStateMatch(cell: Cell, cellState: CellState): boolean {
        return this.getCellState(cell.gridRow, cell.gridCol) === cellState;
    }

    /**
     * set the cell status to occupied
     * @param targetCell target cell
     */
     occupyCell(targetCell: Cell): void {
        targetCell.cellState = CellState.Occupied;
        this.updateGrid(targetCell);
    }

    /**
     * set the state of the cells in the range to occupied
     * @param cellRange 
     */
    occupyCellRange(cellRange: Cell[]): void{
        if(this.hasCollision(cellRange)) throw Error("Collision detected.");
        
        cellRange.forEach( c => {
            this.occupyCell(c);
        });
    }
    
    /**
     * A wrapper to automaticall compute the address based on direction
     * @param direction 
     * @param startingPoint 
     * @param numberOfCells 
     * @returns array of cell with it's state
     */
    getCellRangeAddress(direction: Direction, startingPoint: Cell, numberOfCells: number): Cell[] {
        if(direction === Direction.Horizontal){
            return this.getHorizontalRange(startingPoint, numberOfCells);
        }

        if(direction === Direction.Vertical){
            return this.getVerticalRange(startingPoint, numberOfCells);
        }

        throw Error("Invalid direction");
    }

    isStartingPointValid(startingPoint: Cell): boolean {
        try{
            this.getGridCell(startingPoint.gridRow, startingPoint.gridCol); 
            return true;
        }catch{
            throw new InvalidCellError(startingPoint.gridRow, startingPoint.gridCol, "starting point not found");
        }
    }

    getHorizontalRange(startingPoint: Cell, numberOfCells: number) : Cell[]{

        if(!this.isStartingPointValid(startingPoint)) return;
        
        if(numberOfCells <= 0 ) throw Error("Number of cell must be > 0");

        const rowIndex = startingPoint.gridRow;
        const lastColIndex = startingPoint.gridCol + (numberOfCells - 1); // minus 1 to match the array index
        const cellRange = [];
        
        if(lastColIndex > this.cols - 1) throw new CellRangeOutOfRangeError( cellRange, "Range out of bounds");

        for( let colIndex = startingPoint.gridCol; colIndex <= lastColIndex ; colIndex++ ){
            cellRange.push(new Cell(rowIndex, colIndex, this.grid[rowIndex][colIndex]));
        }

        if(cellRange.length !== numberOfCells) throw new CellRangeOutOfRangeError( cellRange, "Range out of bounds");

        return cellRange;
    }

    getVerticalRange(startingPoint: Cell, numberOfCells: number) : Cell[]{
        
        if(!this.isStartingPointValid(startingPoint)) return;
        
        if(numberOfCells <= 0 ) throw Error("Number of cell must be > 0");

        const colIndex = startingPoint.gridCol;
        const lastRowIndex = startingPoint.gridRow + (numberOfCells - 1); // minus 1 to match the array index
        const cellRange = [];
        
        if(lastRowIndex > this.cols - 1) throw new InvalidCellError( startingPoint.gridRow, startingPoint.gridCol, "Range out of bounds");
        
        for( let rowIndex = startingPoint.gridRow; rowIndex <= lastRowIndex ; rowIndex++ ){
            cellRange.push(new Cell(rowIndex, colIndex, this.grid[rowIndex][colIndex]));
        }

        if(cellRange.length !== numberOfCells) throw new CellRangeOutOfRangeError(cellRange, "Range out of bounds");

        return cellRange;
    }

    /**
     * Checks if any cell in the range is already occupied
     * @param cellRange 
     * @returns boolean
     */
    hasCollision(cellRange: Cell[]): boolean {
        const collision = cellRange.filter(c => c.cellState !== CellState.Open);
        return collision.length > 0;
    }

    /**
     * Updates the cell state to HIT or MISS.
     * If the cell is occupied, update the cell state to HIT
     * If the cell is open, update the cell state to MISS
     * If the cell has been attacked before, return an error.
     * @param targetCell target cell
     * @returns the state of the cell after the attack 
     */
    attackCell(targetCell: Cell): Result {
        const currentCellState = this.getCellState(targetCell.gridRow, targetCell.gridCol);
        
        switch (currentCellState) {
            case CellState.Occupied:
                targetCell.cellState = CellState.Hit;   
                break;
            case CellState.Open:
                targetCell.cellState = CellState.Miss;   
                break;
            default:
                const error = new UnableToUpdateCellError(targetCell);
                return new ActionResult(ActionStatus.Error, error.message, error.name );    
        }

        this.updateGrid(targetCell);
        return new ActionResult(ActionStatus.Success, CellState[targetCell.cellState ]);
    }

    displayGrid(): void {
        console.table(this.grid);
    }
}