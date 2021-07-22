import { Board } from '../board';
import { Ship } from '../ship';
import { Cell } from '../_models/cell';
import { shipOrientation } from '../_models/enumShipOrientation';

import { expect } from 'chai';

describe('Test Battleship Placements', () => { 

    describe('Horizontal Battleship', () => { 

        it('Test set orientation to Horizontal', () => { 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
            battleship.setOrientation(shipOrientation.Horizontal);

            expect(battleship.shipOrientation).to.equal(shipOrientation.Horizontal);
        });

        it('Test ship cell consumption - within boundary', () => { 
            const board = new Board(); 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
            const startCell = new Cell(0,0);
            const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);
            
            expect(shipBoardCells.length).to.equal(battleship.shipLength);
        });


        it('Test ship cell consumption - outside boundary', () => { 
            const board = new Board(); 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
            const startCell = new Cell(0,6);
            
            expect(() => battleship.getShipCellRangeOnBoard(board, startCell)).to.throw(Error, "out of board's range");
        });

        it('Test ship collistion - overlapping', () => { 
            const board = new Board(); 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
            const startCell = new Cell(0,0);
            const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);

            board.occupyCell(shipBoardCells);
            expect(shipBoardCells.filter(c => c.isInUse == false).length).to.equal(0);

            const battleship2 = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
            const startCell2 = new Cell(0,1);
            const shipBoardCells2 = battleship2.getShipCellRangeOnBoard(board, startCell2);

            // check collision
            expect(board.hasCollision(shipBoardCells)).to.true;

            // place ship with collision
            expect(() => board.occupyCell(shipBoardCells2) ).to.throw("cell collision");
        });

        it('Test place ship in the board', () => { 
            const board = new Board(); 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
            const startCell = new Cell(0,0);
            const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);

            board.occupyCell(shipBoardCells);
            expect(shipBoardCells.filter(c => c.isInUse == false).length).to.equal(0);
        });
    });

    describe('Vertical Battleship', () => { 

        it('Test set orientation to Vertical', () => { 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
            battleship.setOrientation(shipOrientation.Vertical);
            expect(battleship.shipOrientation).to.equal(shipOrientation.Vertical);
        });

        it('Test ship cell consumption - within boundary', () => { 
            const board = new Board(); 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
            const startCell = new Cell(0,0);
            const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);

            expect(shipBoardCells.length).to.equal(battleship.shipLength);
        });

        it('Test ship cell consumption - outside boundary', () => { 
            const board = new Board(); 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
            const startCell = new Cell(8,0);
            
            expect(() => battleship.getShipCellRangeOnBoard(board, startCell)).to.throw(Error, "out of board's range");
        });

        it('Test ship collistion - overlapping', () => { 
            const board = new Board(); 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
            const startCell = new Cell(0,0);
            const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);

            board.occupyCell(shipBoardCells);
            expect(shipBoardCells.filter(c => c.isInUse == false).length).to.equal(0);

            const battleship2 = new Ship("battle cuiser", 5, shipOrientation.Vertical);
            const startCell2 = new Cell(1,0);
            const shipBoardCells2 = battleship2.getShipCellRangeOnBoard(board, startCell2);

            // check collision
            expect(board.hasCollision(shipBoardCells)).to.true;

            // place ship with collision
            expect(() => board.occupyCell(shipBoardCells2) ).to.throw("cell collision");
        });

        it('Test place ship in the board', () => { 
            const board = new Board(); 
            const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
            const startCell = new Cell(0,0);
            const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);
            
            // check collision
            expect(board.hasCollision(shipBoardCells)).to.false;

            board.occupyCell(shipBoardCells);
            expect(shipBoardCells.filter(c => c.isInUse == false).length).to.equal(0);
        });
    });

    

});

describe('Test Attack', () => { 

    it('Attack horizontal battleship - HIT', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
        const startCell = new Cell(0,0);
        const targetCell = new Cell(0,1);
        const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);

        // place ship
        board.occupyCell(shipBoardCells);

        // check targetCell
        expect(board.isCellInUse(targetCell)).to.equal(true);

        // attack ship cell
        board.tickCell(targetCell);

        expect(board.isHit(targetCell)).to.equal(true);
    });

    it('Attack horizontal battleship - MISS', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
        const startCell = new Cell(0,0);
        const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);
        const targetCell = new Cell(0,5);

        // place ship
        board.occupyCell(shipBoardCells);

        // attack ship cell
        board.tickCell(targetCell);
    
        expect(board.isHit(targetCell)).to.equal(false);
    });

    it('Attack vertical battleship - HIT', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
        const startCell = new Cell(0,0);
        const targetCell = new Cell(1,0);
        const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);

        // place ship
        board.occupyCell(shipBoardCells);

        // check targetCell
        expect(board.isCellInUse(targetCell)).to.equal(true);

        // attack ship cell
        board.tickCell(targetCell);

        // result
        expect(board.isHit(targetCell)).to.equal(true);
    });

    it('Attack vertical battleship - MISS', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
        const startCell = new Cell(0,0);
        const targetCell = new Cell(5,0);
        const shipBoardCells = battleship.getShipCellRangeOnBoard(board, startCell);

        // place ship
        board.occupyCell(shipBoardCells);

        // attack ship cell
        board.tickCell(targetCell);
    
        expect(board.isHit(targetCell)).to.equal(false);
    });

});