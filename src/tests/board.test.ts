import { Board } from '../board';
import { Ship } from '../ship';
import { Cell } from '../cell';
import { shipOrientation } from '../_models/enumShipOrientation';

import { expect } from 'chai';


describe('Test Board Size', () => { 
    it('Test default board size', () => { 
        const board = new Board(); 
        expect(board.getTotalRows()).to.equal(10);
        expect(board.getTotalCols()).to.equal(10);
    });

    it('Test board size option', () => { 
        const board = new Board(5,5); 
        expect(board.getTotalRows()).to.equal(5);
        expect(board.getTotalCols()).to.equal(5);
    });

    it('Test negative row board size', () => { 
        expect(() =>  new Board(-5, 5) ).to.throw(Error, "row and column size must be more than 0");
    });

    it('Test 0 row board size', () => { 
        expect(() => new Board(0, 5)).to.throw(Error, "row and column size must be more than 0");
    });

    it('Test negative column board size', () => { 
        expect(() => new Board(5, -5)).to.throw(Error, "row and column size must be more than 0");
    });

    it('Test 0 column board size', () => { 
        expect(() => new Board(5, 0)).to.throw(Error, "row and column size must be more than 0");
    });

    it('Test 0 row and 0 column board size', () => { 
        expect(() => new Board(0, 0)).to.throws( "row and column size must be more than 0");
    });
});
