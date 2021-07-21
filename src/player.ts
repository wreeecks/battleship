import { Board } from "./Board";
import { Ship } from "./ship";
import { Cell } from "./_models/cell";

export class Player {
    name: string;
    board!: Board;
    fleets!: Ship[];
    
    constructor(name: string) {
        this.name = name;
    }

    setGameBoard(row: number, cols: number) : void {
        console.log(row, cols);
        this.board = new Board(row, cols);
    }

    setPlayableFleets(fleets: Ship[]) : void {
        this.fleets = fleets;
    }

    placeShip(ship: Ship, cell: Cell){
        //this.board.occupyCell()
    }

    attack(board: Board, cell: Cell){
        
    }

    
}