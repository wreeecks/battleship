import { expect } from "chai";
import { Board } from "../board";
import { Cell } from "../models/cell";


describe("Test Board Size", () => {
	it("Test default board size", () => {
		const board = new Board();
		expect(board.getTotalRows()).to.equal(10);
		expect(board.getTotalCols()).to.equal(10);
	});

	it("Test board size option", () => {
		const board = new Board(5,5);
		expect(board.getTotalRows()).to.equal(5);
		expect(board.getTotalCols()).to.equal(5);
	});

	it("Test negative row board size", () => {
		expect(() =>  new Board(-5, 5) ).to.throw(Error, "row and column size must be more than 0");
	});

	it("Test 0 row board size", () => {
		expect(() => new Board(0, 5)).to.throw(Error, "row and column size must be more than 0");
	});

	it("Test negative column board size", () => {
		expect(() => new Board(5, -5)).to.throw(Error, "row and column size must be more than 0");
	});

	it("Test 0 column board size", () => {
		expect(() => new Board(5, 0)).to.throw(Error, "row and column size must be more than 0");
	});

	it("Test 0 row and 0 column board size", () => {
		expect(() => new Board(0, 0)).to.throws( "row and column size must be more than 0");
	});
});

describe("Test Board Actions", () => {
	it("Test tick cell", () => {
		const board = new Board();
		const cell = new Cell(0,0);

		expect(board.isCellTicked(cell)).to.equal(false);

		board.tickCell(cell);
		expect(board.isCellTicked(cell)).to.equal(true);
	});

	it("Test double tick cell", () => {
		const board = new Board();
		const cell = new Cell(0,0);

		board.tickCell(cell);
		expect(board.isCellTicked(cell)).to.equal(true);

		expect(() => board.tickCell(cell)).to.throw("cell is already ticked");
	});
});
