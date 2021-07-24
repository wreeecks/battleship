import { expect } from "chai";
import { Board } from "../board";
import { Cell, CellState, Direction } from "../models/cell";
import { Ship } from "../ship";

describe("Test Battleship placement and boundaries on a 10x10 Board", () => {

	describe("Horizontal Battleship", () => {

		it("Test set ship orientation to Horizontal", () => {
			const battleship = new Ship("battle cruiser", 5, Direction.Vertical);
			battleship.setOrientation(Direction.Horizontal);

            expect(battleship.getOrientation()).to.not.equal(Direction.Vertical);
			expect(battleship.getOrientation()).to.equal(Direction.Horizontal);
		});

		it("Test ship cell consumption - within boundary", () => {
			const board = new Board();
			const battleship = new Ship("battle cruiser", 5);
			const startingPoint = new Cell(0,0);
			const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startingPoint);

			expect(shipBoardCells.length).to.equal(battleship.getShipLength());
		});

		it("Test ship cell consumption - outside boundary", () => {
			const board = new Board();
			const battleship = new Ship("battle cruiser", 5);
			const startingPoint = new Cell(0,6);

            expect(() => battleship.getShipCellRangeOnBoard(board, startingPoint)).to.throw(Error, "Range out of bounds");
		});

		it("Test ship collistion - overlapping", () => {
			const board = new Board();
			const ship1 = new Ship("battle cruiser", 5);
			const ship1StartingPoint = new Cell(0,0);
			const ship1BoardCells = ship1.getShipCellRangeOnBoard(board, ship1StartingPoint);
            
			board.occupyCellRange(ship1BoardCells);
			expect(ship1BoardCells.filter(c => c.cellState === CellState.Open).length).to.equal(0);
			expect(ship1BoardCells.filter(c => c.cellState === CellState.Occupied).length).to.equal(ship1.getShipLength());

			const ship2 = new Ship("battle cruiser", 5);
			const ShipStartingPoint = new Cell(0,1);
			const ShipBoardCells = ship2.getShipCellRangeOnBoard(board, ShipStartingPoint);

			// check collision
			expect(board.hasCollision(ShipBoardCells)).to.equal(true);

			// place ship with collision
			expect(() => board.occupyCellRange(ShipBoardCells)).to.throw("Collision detected.");
		});

		it("Test place ship in the board", () => {
			const board = new Board();
			const ship = new Ship("battle cruiser", 5);
			const startCell = new Cell(0,0);
			const shipBoardCells = ship.getShipCellRangeOnBoard(board, startCell);

			board.occupyCellRange(shipBoardCells);
			expect(shipBoardCells.filter(c => c.cellState === CellState.Open).length).to.equal(0);
			expect(shipBoardCells.filter(c => c.cellState === CellState.Occupied).length).to.equal(ship.getShipLength());
		});
	});

	describe("Vertical Battleship", () => {

		it("Test set ship orientation to Vertical", () => {
			const battleship = new Ship("battle cruiser", 5);
			battleship.setOrientation(Direction.Vertical);

			expect(battleship.getOrientation()).to.not.equal(Direction.Horizontal);
			expect(battleship.getOrientation()).to.equal(Direction.Vertical);
		});

		it("Test ship cell consumption - within boundary", () => {
			const board = new Board();
			const battleship = new Ship("battle cruiser", 5, Direction.Vertical);
			const startingPoint = new Cell(0,0);
			const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startingPoint);

			expect(shipBoardCells.length).to.equal(battleship.getShipLength());
		});

		it("Test ship cell consumption - outside boundary", () => {
			const board = new Board();
			const battleship = new Ship("battle cruiser", 5, Direction.Vertical);
			const startingPoint = new Cell(8,0);

            expect(() => battleship.getShipCellRangeOnBoard(board, startingPoint)).to.throw(Error, "Range out of bounds");
		});

		it("Test ship collistion - overlapping", () => {
			const board = new Board();
			const ship1 = new Ship("battle cruiser", 5, Direction.Vertical);
			const ship1StartingPoint = new Cell(0,0);
			const ship1BoardCells = ship1.getShipCellRangeOnBoard(board, ship1StartingPoint);
            
			board.occupyCellRange(ship1BoardCells);
			expect(ship1BoardCells.filter(c => c.cellState === CellState.Open).length).to.equal(0);
			expect(ship1BoardCells.filter(c => c.cellState === CellState.Occupied).length).to.equal(ship1.getShipLength());

			const ship2 = new Ship("battle cruiser", 5, Direction.Vertical);
			const ShipStartingPoint = new Cell(1,0);
			const ShipBoardCells = ship2.getShipCellRangeOnBoard(board, ShipStartingPoint);

			// check collision
			expect(board.hasCollision(ShipBoardCells)).to.equal(true);

			// place ship with collision
			expect(() => board.occupyCellRange(ShipBoardCells)).to.throw("Collision detected.");
		});

		it("Test place ship in the board", () => {
			const board = new Board();
			const ship = new Ship("battle cruiser", 5, Direction.Vertical);
			const startingPoint = new Cell(0,0);
			const shipBoardCells = ship.getShipCellRangeOnBoard(board, startingPoint);

			board.occupyCellRange(shipBoardCells);
			expect(shipBoardCells.filter(c => c.cellState === CellState.Open).length).to.equal(0);
			expect(shipBoardCells.filter(c => c.cellState === CellState.Occupied).length).to.equal(ship.getShipLength());
		});
	});
});

describe("Test Attack Ship", () => {

	it("Attack horizontal battleship - HIT", () => {
		const board = new Board();
		const battleship = new Ship("battle cruiser", 5);
		const startingPoint = new Cell(0,0);
		const targetCell = new Cell(0,1);
		const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startingPoint);

		// place ship
		board.occupyCellRange(shipBoardCells);

		// check targetCell state
		expect(board.isCellState(targetCell, CellState.Occupied)).to.equal(true);

		// attack ship cell
		board.attackCell(targetCell);

        // check targetCell state
		expect(board.isCellState(targetCell, CellState.Hit)).to.equal(true);
	});

	it("Attack horizontal battleship - MISS", () => {
		const board = new Board();
		const battleship = new Ship("battle cruiser", 5);
		const startingPoint = new Cell(0,0);
		const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startingPoint);
		const targetCell = new Cell(0,5);

		// place ship
		board.occupyCellRange(shipBoardCells);

		// attack ship cell
		board.attackCell(targetCell);

		expect(board.isCellState(targetCell, CellState.Miss)).to.equal(true);
	});

	it("Attack vertical battleship - HIT", () => {
		const board = new Board();
		const battleship = new Ship("battle cruiser", 5, Direction.Vertical);
		const startingPoint = new Cell(0,0);
		const targetCell = new Cell(1,0);
		const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startingPoint);

		// place ship
		board.occupyCellRange(shipBoardCells);

		// check targetCell
		expect(board.isCellState(targetCell, CellState.Occupied)).to.equal(true);

		// attack ship cell
		board.attackCell(targetCell);

		// result
		expect(board.isCellState(targetCell, CellState.Hit)).to.equal(true);
	});

	it("Attack vertical battleship - MISS", () => {
		const board = new Board();
		const battleship = new Ship("battle cruiser", 5, Direction.Vertical);
		const startingPoint = new Cell(0,0);
		const targetCell = new Cell(5,0);
		const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startingPoint);

		// place ship
		board.occupyCellRange(shipBoardCells);

		// attack ship cell
		board.attackCell(targetCell);

		expect(board.isCellState(targetCell, CellState.Miss)).to.equal(true);
	});

});