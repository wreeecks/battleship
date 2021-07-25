import { Cell } from "./cell";

export class BoardSizeError extends Error {
    row: any;
    col: any;

    constructor(row, col, ...params) {
        super(...params)
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, BoardSizeError)
        }

        this.name = 'BoardSizeError';
        this.message = `Row and column size must be more than 0`;
        this.row = row;
        this.col= col;
    }
}

export class InvalidCellError extends Error {
    row: any;
    col: any;
    cellIndex: string;
    
    constructor(row, col, message, ...params) {
        super(...params)
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, InvalidCellError)
        }

        this.name = 'InvalidCellError';
        this.message = message;    
        this.row = row;
        this.col = col;
        this.cellIndex = `Cell[${row}][${col}]`;
    }
}

export class CellRangeOutOfRangeError extends Error {
    cellRange: Cell[];
    constructor(cellRange: Cell[], ...params) {
        super(...params)
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, CellRangeOutOfRangeError)
        }

        this.name = 'CellRangeOutOfRangeError'
        this.message = 'Cell range is out range';
        this.cellRange = cellRange;
    }
}

export class UnableToUpdateCellError extends Error {
    cell: Cell;
    constructor(cell: Cell, ...params) {
        super(...params)
    
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, UnableToUpdateCellError)
        }

        this.name = 'UnableToUpdateCellError'
        this.message = 'Unable to update cell';
        this.cell = cell;
    }
}