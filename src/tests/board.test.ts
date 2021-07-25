import { expect } from "chai";
import { Board } from "../board";
import { ActionStatus } from "../interfaces/result";
import { Cell, CellState } from "../models/cell";

describe("Test Board Creation", () => {
    it("Create a board without setting a size", () => {
       const board = new Board()
       expect(board.getRows()).to.equal(10);
       expect(board.getCols()).to.equal(10);
    });

    it("Create a 5x5 board ", () => {
        const board = new Board(5,5);
        expect(board.getCols()).to.equal(5);
        expect(board.getRows()).to.equal(5);
     });

     it("Create a 0x0 board ", () => {
        expect(() => new Board(0,0)).to.throw("Row and column size must be more than 0");
     });

     it("Create a 1x0 board ", () => {
        expect(() => new Board(1,0)).to.throw("Row and column size must be more than 0");
     });

     it("Create a 0x1 board ", () => {
        expect(() => new Board(1,0)).to.throw("Row and column size must be more than 0");
     });

     it("Create a -10x-10 board ", () => {
        expect(() => new Board(-1,-10)).to.throw("Row and column size must be more than 0");
     });
});

describe("Board Utilities", () => {
    const board = new Board();
    const targetCell = new Cell(0,0);
    const openCell = new Cell(1,1);

    it("Get an a cell from the board", () => {
        expect(() => board.getGridCell(0,0)).to.not.throw("Cell not found");
        expect(board.getGridCell(0,0)).to.have.a.property('cellState').that.is.not.null;
    });

    it("Get a non-existent cell from the board", () => {
        expect(() => board.getGridCell(20,20)).to.throw("Cell not found");
    });
});


describe("Test Cell Range", () => {
    const board = new Board();
    
    it("Get 5 cells from point(0,0) horizontally", () => {
        const startingPoint = new Cell(0,0);
        const horizontalCellRange = board.getHorizontalRange(startingPoint, 5);
        
        expect(horizontalCellRange).to.length(5);
        expect(horizontalCellRange[0]).to.have.a.property('gridRow').that.is.equal(0);
        expect(horizontalCellRange[0]).to.have.a.property('gridCol').that.is.equal(0);
        expect(horizontalCellRange[0]).to.have.a.property('cellState');
    });

    it("Get 5 cells from point(0,5) horizontally", () => {
        const startingPoint = new Cell(0,5);
        const horizontalCellRange = board.getHorizontalRange(startingPoint, 5);
        
        expect(horizontalCellRange).to.length(5);
        expect(horizontalCellRange[0]).to.have.a.property('gridRow').that.is.equal(0);
        expect(horizontalCellRange[0]).to.have.a.property('gridCol').that.is.equal(5);
        expect(horizontalCellRange[0]).to.have.a.property('cellState');
    });

    it("Get 5 cells from point(-1,-1) horizontally", () => {
        const startingPoint = new Cell(-1,-1);
        expect(() => board.getHorizontalRange(startingPoint, 5)).to.throw("starting point not found");
    });

    it("Get 5 cells from point(-1,0) horizontally", () => {
        const startingPoint = new Cell(-1,0);
        expect(() => board.getHorizontalRange(startingPoint, 5)).to.throw("starting point not found");
    });

    it("Get 5 cells from point(0,-1) horizontally", () => {
        const startingPoint = new Cell(0,-1);
        expect(() => board.getHorizontalRange(startingPoint, 5)).to.throw("starting point not found");
    });

    it("Get 0 cells from point(0,0) horizontally", () => {
        const startingPoint = new Cell(0,0);
        expect(() => board.getHorizontalRange(startingPoint, 0)).to.throw("Number of cell must be > 0");
    });
});

describe("Occupy Board Cells", () => {
    const board = new Board();
    const targetCell = new Cell(0,0);

    it("Occupy a cell in the board", () => {
        board.occupyCell(targetCell);
        expect(board.isCellStateMatch(targetCell, CellState.Occupied)).to.true;
    });

    it("Occupying Horizontal cellRage [1,1] - [1-3]", () => {
        const board = new Board();
        const threeHorizontalCells = board.getHorizontalRange(new Cell(1,1), 3);

        expect(threeHorizontalCells.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(3);

        board.occupyCellRange(threeHorizontalCells);

        expect(threeHorizontalCells.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(0);
        expect(threeHorizontalCells.filter(c => c.cellState === CellState.Occupied)).to.have.lengthOf(3);
    });

    it("Occupying Vertical cellRage [3,1] - [5,1]", () => {
        const board = new Board();
        const threeVerticalCells = board.getVerticalRange(new Cell(3,1), 3);

        expect(threeVerticalCells.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(3);

        board.occupyCellRange(threeVerticalCells);

        expect(threeVerticalCells.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(0);
        expect(threeVerticalCells.filter(c => c.cellState === CellState.Occupied)).to.have.lengthOf(3);
    });

});

describe("Test Cell Collision", () => {
    it("Occupy range cell and check collision", () => {
        const board = new Board();
        const range1 = board.getVerticalRange(new Cell(3,1), 3);
        board.occupyCellRange(range1);
        expect(range1.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(0);
        expect(range1.filter(c => c.cellState === CellState.Occupied)).to.have.lengthOf(3);
        
        const range2 = board.getVerticalRange(new Cell(1,1), 3);
        expect(()=>board.occupyCellRange(range2)).to.throw("Collision detected.");
    });
});

describe("Test Board Cell Interactions", () => {
    const board = new Board();
    const targetCell = new Cell(0,0);
    const openCell = new Cell(1,1);
    
    // place occupy target cell
    board.occupyCell(targetCell);
    
    it("Attack an occupied Cell - HIT", () => {
        expect(board.attackCell(targetCell)).to.be.an('object').to.eql({
            'status': ActionStatus.Success,
            'message': CellState[CellState.Hit],
            'errorName': undefined
        });
        expect(board.isCellStateMatch(targetCell, CellState.Hit)).to.true;
        expect(board.isCellStateMatch(targetCell, CellState.Open)).to.false;
    });

    it("Attack an open Cell - MISS", () => {
        expect(board.attackCell(openCell)).to.be.an('object').to.eql({
            'status': ActionStatus.Success,
            'message': CellState[CellState.Miss],
            'errorName': undefined
        });
        expect(board.isCellStateMatch(openCell, CellState.Miss)).to.true;
        expect(board.isCellStateMatch(openCell, CellState.Open)).to.false;
    });

    it("Attack a cell with a MISS state", () => {
        const x = board.attackCell(openCell);
        expect(board.attackCell(openCell)).to.be.an('object').to.eql({
            'status': ActionStatus.Error,
            'message': 'Unable to update cell',
            'errorName': 'UnableToUpdateCellError'
        });
        expect(board.isCellStateMatch(openCell, CellState.Miss)).to.true;
    });

    it("Attack a cell with HIT state", () => {
        expect(board.attackCell(targetCell)).to.be.an('object').to.eql({
            'status': ActionStatus.Error,
            'message': 'Unable to update cell',
            'errorName': 'UnableToUpdateCellError'
        });
        expect(board.isCellStateMatch(targetCell, CellState.Hit)).to.true;
    });
});