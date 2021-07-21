import { Board } from '../board';
import { Ship } from '../ship';
import { Cell } from '../cell';
import { shipOrientation } from '../_models/enumShipOrientation';

import { expect } from 'chai';

describe('Test Horizontal Battleship on Board', () => { 

    it('Test battleship orientation - set to Horizontal', () => { 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
        battleship.setOrientation(shipOrientation.Horizontal);
        expect(battleship.shipOrientation).to.equal(shipOrientation.Horizontal);
    });

    it('Test horizontal battleship within board', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
        const startCell = new Cell(0,0);
        const shipBoardCells = board.getHorizontalCellRange(startCell, battleship.shipLength);

        expect(shipBoardCells.length).to.equal(battleship.shipLength);
    });


    it('Test horizontal battleship out of bound', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
        const startCell = new Cell(0,6);
        
        expect(() => board.getHorizontalCellRange(startCell, battleship.shipLength)).to.throw(Error, "out of board's range");
    });

    it('Place horizontal battleship in the board', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
        const startCell = new Cell(0,0);
        const shipBoardCells = board.getHorizontalCellRange(startCell, battleship.shipLength);


        expect(shipBoardCells.length).to.equal(battleship.shipLength);
    });

});


describe('Test Vetical Battleship on Board', () => { 

    it('Test battleship orientation - set to Vertical', () => { 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Horizontal);
        battleship.setOrientation(shipOrientation.Vertical);
        expect(battleship.shipOrientation).to.equal(shipOrientation.Vertical);
    });

    it('Test vertical battleship within board', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
        const startCell = new Cell(0,0);
        const shipBoardCells = board.getVerticalCellRange(startCell, battleship.shipLength);

        expect(shipBoardCells.length).to.equal(battleship.shipLength);
    });


    it('Test vertical battleship out of bound', () => { 
        const board = new Board(); 
        const battleship = new Ship("battle cuiser", 5, shipOrientation.Vertical);
        const startCell = new Cell(6,0);
        
        expect(() => board.getVerticalCellRange(startCell, battleship.shipLength)).to.throw(Error, "out of board's range");
    });
});