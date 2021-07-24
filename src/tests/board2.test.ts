import { expect } from "chai";
import { Board2 } from "../board2";
import { Cell2, CellState } from "../models/cell2";

describe("Test Board Creation", () => {
    it("Create a board without setting a size", () => {
       const board = new Board2()
       expect(board.getTotalCols()).to.equal(10);
       expect(board.getTotalRows()).to.equal(10);
    });

    it("Create a 5x5 board ", () => {
        const board = new Board2(5,5);
        expect(board.getTotalCols()).to.equal(5);
        expect(board.getTotalRows()).to.equal(5);
     });

     it("Create a 0x0 board ", () => {
        expect(() => new Board2(0,0)).to.throw("Row and column size must be more than 0");
     });

     it("Create a 1x0 board ", () => {
        expect(() => new Board2(1,0)).to.throw("Row and column size must be more than 0");
     });

     it("Create a 0x1 board ", () => {
        expect(() => new Board2(1,0)).to.throw("Row and column size must be more than 0");
     });

     it("Create a -10x-10 board ", () => {
        expect(() => new Board2(-1,-10)).to.throw("Row and column size must be more than 0");
     });
});

describe("Board Utilities", () => {
    const board = new Board2();
    const targetCell = new Cell2(0,0);
    const openCell = new Cell2(1,1);

    it("Get an a cell from the board", () => {
        expect(() => board.getGridCell(0,0)).to.not.throw("Cell not found");
        expect(board.getGridCell(0,0)).to.have.a.property('cellState').that.is.not.null;
    });

    it("Get a non-existent cell from the board", () => {
        expect(() => board.getGridCell(20,20)).to.throw("Cell not found");
    });
});


describe("Test Cell Range", () => {
    const board = new Board2();
    
    it("Get 5 cells from point(0,0) horizontally", () => {
        const startingPoint = new Cell2(0,0);
        const horizontalCellRange = board.getHorizontalRange(startingPoint, 5);
        
        expect(horizontalCellRange).to.length(5);
        expect(horizontalCellRange[0]).to.have.a.property('gridRow').that.is.equal(0);
        expect(horizontalCellRange[0]).to.have.a.property('gridCol').that.is.equal(0);
        expect(horizontalCellRange[0]).to.have.a.property('cellState');
    });

    it("Get 5 cells from point(0,5) horizontally", () => {
        const startingPoint = new Cell2(0,5);
        const horizontalCellRange = board.getHorizontalRange(startingPoint, 5);
        
        expect(horizontalCellRange).to.length(5);
        expect(horizontalCellRange[0]).to.have.a.property('gridRow').that.is.equal(0);
        expect(horizontalCellRange[0]).to.have.a.property('gridCol').that.is.equal(5);
        expect(horizontalCellRange[0]).to.have.a.property('cellState');
    });

    it("Get 5 cells from point(-1,-1) horizontally", () => {
        const startingPoint = new Cell2(-1,-1);
        expect(() => board.getHorizontalRange(startingPoint, 5)).to.throw("starting point not found");
    });

    it("Get 5 cells from point(-1,0) horizontally", () => {
        const startingPoint = new Cell2(-1,0);
        expect(() => board.getHorizontalRange(startingPoint, 5)).to.throw("starting point not found");
    });

    it("Get 5 cells from point(0,-1) horizontally", () => {
        const startingPoint = new Cell2(0,-1);
        expect(() => board.getHorizontalRange(startingPoint, 5)).to.throw("starting point not found");
    });

    it("Get 0 cells from point(0,0) horizontally", () => {
        const startingPoint = new Cell2(0,0);
        expect(() => board.getHorizontalRange(startingPoint, 0)).to.throw("Number of cell must be > 0");
    });
});

describe("Occupy Board Cells", () => {
    const board = new Board2();
    const targetCell = new Cell2(0,0);

    it("Occupy a cell in the board", () => {
        board.occupyCell(targetCell);
        expect(board.isCellState(targetCell, CellState.Occupied)).to.true;
    });

    it("Occupying Horizontal cellRage [1,1] - [1-3]", () => {
        const board = new Board2();
        const threeHorizontalCells = board.getHorizontalRange(new Cell2(1,1), 3);

        expect(threeHorizontalCells.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(3);

        board.occupyCellRange(threeHorizontalCells);

        expect(threeHorizontalCells.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(0);
        expect(threeHorizontalCells.filter(c => c.cellState === CellState.Occupied)).to.have.lengthOf(3);
    });

    it("Occupying Vertical cellRage [3,1] - [5,1]", () => {
        const board = new Board2();
        const threeVerticalCells = board.getVerticalRange(new Cell2(3,1), 3);

        expect(threeVerticalCells.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(3);

        board.occupyCellRange(threeVerticalCells);

        expect(threeVerticalCells.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(0);
        expect(threeVerticalCells.filter(c => c.cellState === CellState.Occupied)).to.have.lengthOf(3);
    });

});

describe("Test Cell Collision", () => {
    it("Occupy range cell and check collision", () => {
        const board = new Board2();
        const range1 = board.getVerticalRange(new Cell2(3,1), 3);
        board.occupyCellRange(range1);
        expect(range1.filter(c => c.cellState === CellState.Open)).to.have.lengthOf(0);
        expect(range1.filter(c => c.cellState === CellState.Occupied)).to.have.lengthOf(3);
        
        const range2 = board.getVerticalRange(new Cell2(1,1), 3);
        expect(()=>board.occupyCellRange(range2)).to.throw("Collision detected.");
    });
});

describe("Test Board Cell Interactions", () => {
    const board = new Board2();
    const targetCell = new Cell2(0,0);
    const openCell = new Cell2(1,1);
    
    // place occupy target cell
    board.occupyCell(targetCell);
    
    it("Attack an occupied Cell - HIT", () => {
        expect(board.attackCell(targetCell)).to.equal(CellState.Hit);
        expect(board.isCellState(targetCell, CellState.Hit)).to.true;
    });

    it("Attack an open Cell - MISS", () => {
        expect(board.attackCell(openCell)).to.equal(CellState.Miss);
        expect(board.isCellState(openCell, CellState.Miss)).to.true;
        expect(board.isCellState(openCell, CellState.Open)).to.false;
    });

    it("Attack a cell with a MISS state", () => {
        expect(() => board.attackCell(openCell)).to.throw("Unable to attack the same cell");
        expect(board.isCellState(openCell, CellState.Miss)).to.true;
    });

    it("Attack a cell with HIT state", () => {
        expect(() => board.attackCell(targetCell)).to.throw("Unable to attack the same cell");
        expect(board.isCellState(targetCell, CellState.Hit)).to.true;
    });
});