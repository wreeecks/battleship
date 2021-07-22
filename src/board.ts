import { Cell } from "./models/cell";

export class Board {
	private rows: number;
	private cols: number;
	private grid: Cell[] = [];

	constructor(rows: number = 10, cols: number = 10) {
		this.setBoardSize(rows, cols);
		this.createBoard();
	}

	/**
	 * Set Board Size
	 * @param rows must be more than 0, defaults to 10.
	 * @param cols must be more than 0, defaults to 10.
	 */
	setBoardSize(rows: number, cols: number): void {
		if (rows <= 0 || cols <= 0)
			throw Error("row and column size must be more than 0");

		this.rows = rows;
		this.cols = cols;
	}

	/**
	 * Create Game Board
	 * This will reset the grid
	 */
	createBoard(): void {
		const totalRows = this.rows;
		const totalCols = this.cols;
		this.grid = []; // reset grid

		for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
			for (let colIndex = 0; colIndex < totalCols; colIndex++) {
				const cell = new Cell(rowIndex, colIndex);
				this.grid.push(cell);
			}
		}
	}

	/**
	 * Get Board Grid
	 * @returns array of cells
	 */
	getGrid(): Cell[] {
		return this.grid;
	}

	/**
	 * Get Total Board Rows
	 * @returns number board's total number of rows
	 */
	getTotalRows(): number {
		return this.rows;
	}

	/**
	 * Get Total Cols
	 * @returns number board's total number of columns
	 */
	getTotalCols(): number {
		return this.cols;
	}

	/**
	 * Get Grid Cell
	 * @param row Board row number
	 * @param col Board column number
	 * @returns Cell or undefined if not found.
	 */
	getGridCell(targetCell: Cell): Cell | undefined {
		const cell = this.grid.find((c) => c.gridRow === targetCell.gridRow && c.gridCol === targetCell.gridCol);

		if (!cell) throw Error("cell not found");

		return cell;
	}

	/**
	 * Checks if any of the cell range is already taken
	 * @param cellRange
	 * @returns boolean
	 */
	hasCollision(cellRange: Cell[]): boolean {
		return cellRange.filter((c) => c.isInUse)?.length > 0;
	}

	/**
	 * Checks if the cell is in user
	 * @param cellRange
	 * @returns boolean
	 */
	isHit(targetCell: Cell): boolean {
		return this.isOccupied(targetCell);
	}

	/**
	 * Checks if the cell address is already in use.
	 * @param targetCell target cell
	 * @returns boolean
	 */
	 isOccupied(targetCell: Cell): boolean {
		const cell = this.getGridCell(targetCell);
		return cell.isInUse;
	}

	/**
	 * Used when the user guess a cell, flag the cell as "ticked".
	 * @param row Board row number
	 * @param col Board column number
	 */
	tickCell(targetCell: Cell): void {
		const cell = this.getGridCell(targetCell);

		if (cell.isTicked) throw Error("cell is already ticked");

		cell.isTicked = true;
	}

	/**
	 * Is Cell Ticked
	 * checks if the cell has been ticked
	 * @param targetCell
	 * @returns
	 */
	isCellTicked(targetCell: Cell): boolean {
		return this.grid.find(
			(c) =>
				c.gridRow === targetCell.gridRow && c.gridCol === targetCell.gridCol
		)?.isTicked;
	}

	/**
	 * Occupy Cell
	 * Mark the cell in use.
	 * @param cellRange target cell range
	 */
	occupyCell(cellRange: Cell[]): void {
		cellRange.forEach((cell) => {
			const targetCell = this.getGridCell(cell);

			if (targetCell.isInUse) throw Error("cell collision");

			targetCell.isInUse = true;
		});
	}

	/**
	 * Free Cell
	 * Mark the cell as NOT in use.
	 * @param cellRange target cell range
	 */
	freeCell(cellRange: Cell[]): void {
		cellRange.forEach((cell) => {
			const targetCell = this.getGridCell(cell);
			targetCell.isInUse = false;
		});
	}

	displayGrid(): void {
		const gridUI = [];
		for (let r = 0; r < this.rows; r++) {
			const row = this.grid
				.filter((c) => c.gridRow === r)
				.map((i) => {
					if (i.isInUse && i.isTicked) return "*";
					if (i.isInUse) return "#";
					return "";
				});
			gridUI.push(row);
		}

		// tslint:disable-next-line:no-console
		console.table(gridUI);
	}
}
