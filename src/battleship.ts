import { Cell } from './_models/cell';
import { Player } from "./player";
import { Ship } from "./ship";

export class Battleship {
    rows: number = 10;
    cols: number = 10;
    player1!: Player;
    player2!: Player;
    winner?: Player;

    ships: any[] = [ 
        // {name: "Carrier", size: 5},
        // {name: "Battleship", size: 3},
        {name: "Submarine", size: 3},
        {name: "Patrol Boat", size: 5}
    ];  

    shipObj: Ship[] = [
        new Ship("banka", 1),
        new Ship("salbabida"), 
        new Ship("udo", 3)
    ];
        

    constructor(rows?: number, cols?: number, fleets?: Ship[]) {
        this.setBoardSize(rows, cols);
        this.setGameShipUnits(fleets);
    }

    setBoardSize(rows?: number, cols?: number) : void {
        if (rows && cols){
            this.rows = rows;
            this.cols = cols;
        }
    }

    setGameShipUnits(ships?: Ship[]) : void {
        if(ships){
            this.ships = ships;
        }
    }

    start(){
        this.winner = undefined;
        this.player1 = this.createPlayer("Player 1");
        this.player2 = this.createPlayer("Player 2");
    }

    convertShipsToShipObj() : Ship[]{
        const arrayShipObj = [];
        this.ships.forEach(ship => {
            arrayShipObj.push( new Ship(ship.name, ship.size));
            }
        );
        return arrayShipObj;
    }

    createPlayer(name: string) : Player {
        const player = new Player(name);
        player.setGameBoard(this.rows, this.cols);
        player.setPlayableFleets(this.convertShipsToShipObj());
        return player;
    }

    placeShip(player: Player, ship: Ship, cell: Cell){
        player.placeShip(ship,cell);
    }

    attackPlayer(activePlayer: Player, targetPlayer: Player, cell: Cell){
        const isHit = activePlayer.attack(targetPlayer, cell);
        if(isHit) this.checkWinner();
        return isHit;
    }

    checkWinner(){
        if(!this.player1.hasRemainingShips()){
            this.winner = this.player2;
        }

        if(!this.player2.hasRemainingShips()){
            this.winner = this.player1;
        }
    }
}