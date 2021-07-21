import { Board } from "./Board";
import { Player } from "./player";
import { Ship } from "./ship";

export class Battleship {
    rows: number = 10;
    cols: number = 10;
    player1!: Player;
    player2!: Player;
    playerTurn: number = 0;
    isGameOver: boolean = false;
    winner?: Player;

    fleets: Ship[] = [
        new Ship("Carrier", 5),
        new Ship("Battleship", 3),
        new Ship("Submarine", 3),
        new Ship("Patrol Boat", 2)
    ];

    constructor(rows?: number, cols?: number, fleets?: Ship[]) {
        this.setBoardSize(rows, cols);
        this.setGameShipUnits(fleets);
    }

    setBoardSize(rows?: number, cols?: number) : void {
        if (rows && cols){
            this.rows = rows;
            this.cols = cols;
            console.log("using user params")
            
        }
        console.log("using default values");
    }

    setGameShipUnits(fleets?: Ship[]) : void {
        if(fleets){
            this.fleets = fleets;
        }
    }

    start(){
        this.isGameOver = false;
        this.player1 = this.createPlayer("Player 1");
        this.player2 = this.createPlayer("Player 2");
    }

    createPlayer(name: string) : Player {
        const player = new Player(name);
        player.setGameBoard(this.rows, this.cols);
        player.setPlayableFleets(this.fleets);
        return player;
    }


}