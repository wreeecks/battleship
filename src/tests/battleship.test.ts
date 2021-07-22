import { expect } from 'chai';
import { exit } from 'process';
import { Battleship } from '../battleship';
import { Cell } from '../cell';
import { shipOrientation } from '../_models/enumShipOrientation';

describe('Game Play', () => { 

    const bs = new Battleship();
    bs.start();

    // player 1 - assign ship position
    const player1 = bs.player1;
    const player2 = bs.player2;
    
    const player1Ships = player1.getShips();
    const player2Ships = player2.getShips();

    // change orientation
    player2Ships[0].setOrientation(shipOrientation.Vertical);

    // position ships
    bs.placeShip(player1, player1Ships[0],  new Cell(0,0));
    bs.placeShip(player1, player1Ships[1],  new Cell(1,0));

    bs.placeShip(player2, player2Ships[0],  new Cell(4,0));
    bs.placeShip(player2, player2Ships[1],  new Cell(0,1));

    it('Player 2 attacks Player 1 ship (orientation: horizontal, size 3)', () => { 
       
        // p2 hits p1 ship
        expect(bs.attackPlayer(player2, player1, new Cell(0,0))).to.true;
        
        // ship damaged but not yet destroyed
        expect(player2Ships[0].isDestroyed).to.false;
        
        // p2 hits ship 
        expect(bs.attackPlayer(player2, player1, new Cell(0,1))).to.true;

        // damaged but not yet destroyed
        expect(player2Ships[0].isDestroyed).to.false;

        // p2 hits ship 
        expect(bs.attackPlayer(player2, player1, new Cell(0,2))).to.true;

        // ship destroyed
        expect(player1Ships[0].isDestroyed).to.true;

        // no winner
        expect(bs.winner).to.undefined;

        // p1 has remaining
        expect(player1.hasRemainingShips()).to.true;        
    });


    it('Player 2 Wins - destroys all player 1 ships', () => { 
       
        // p2 hits and sinks ship 2 
        expect(bs.attackPlayer(player2, player1, new Cell(1,0))).to.true;
        expect(bs.attackPlayer(player2, player1, new Cell(1,1))).to.true;
        expect(bs.attackPlayer(player2, player1, new Cell(1,2))).to.true;
        expect(bs.attackPlayer(player2, player1, new Cell(1,3))).to.true;
        expect(bs.attackPlayer(player2, player1, new Cell(1,4))).to.true;

        // ship 1 destroyed
        expect(player1Ships[1].isDestroyed).to.true;

        // p1 no remaining ship
        expect(player1.hasRemainingShips()).to.false;

        // has winner
        expect(bs.winner.name).to.equal(player2.name);

    });
});