import { Cell } from './models/cell';
import { Player } from "./player";
import { Ship } from "./ship";

export class Battleship {
    rows: number = 10;
    cols: number = 10;
    player1!: Player;
    player2!: Player;
    ships: Ship[] = [
       new Ship("Carrier",  3),
       new Ship("Battleship",  5)
    ];

    constructor(rows?: number, cols?: number, ships?: Ship[]) {
        this.setBoardSize(rows, cols);
        this.setGameShipUnits(ships);
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
        this.player1 = this.createPlayer("Player 1");
        this.player2 = this.createPlayer("Player 2");
    }

    /**
     * Creates a new ship object to be assigned to player's board.
     * @returns array of ships
     */
    getShipsObject() : Ship[]{
        const arrayShipObj = [];
        this.ships.forEach(ship => arrayShipObj.push(new Ship(ship.name, ship.shipLength)));
        return arrayShipObj;
    }

    createPlayer(name: string) : Player {
        const player = new Player(name);
        player.setGameBoard(this.rows, this.cols);
        player.setPlayableFleets(this.getShipsObject());
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
            return this.player2;
        }

        if(!this.player2.hasRemainingShips()){
            return this.player1;
        }

        return null;
    }
}