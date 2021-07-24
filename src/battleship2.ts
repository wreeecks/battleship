import { Cell } from "./models/cell";
import { Player2 } from "./player";
import { Ship } from "./ship";

export class Battleship2 {
    rows: number = 10;
    cols: number = 10;
    player1!: Player2;
    player2!: Player2;
    shipsUnits: Ship[] = [
       new Ship("Carrier",  3),
       new Ship("Battleship",  5)
    ];

    constructor(rows?: number, cols?: number, shipsUnits?: Ship[]) {
        this.setBoardSize(rows, cols);
        this.setGameShipUnits(shipsUnits);
    }

    setBoardSize(rows?: number, cols?: number) : void {
        if (rows && cols){
            this.rows = rows;
            this.cols = cols;
        }
    }

    setGameShipUnits(shipsUnits?: Ship[]) : void {
        if(shipsUnits){
            this.shipsUnits = shipsUnits;
        }
    }

    start(){
        this.player1 = this.createPlayer("Player 1");
        this.player2 = this.createPlayer("Player 2");
    }

    /**
     * Creates a new set of ship objects.
     * @returns array of ships objects
     */
    getShipsObject(): Ship[]{
        const arrayShipObj = [];
        this.shipsUnits.forEach(ship => arrayShipObj.push(new Ship(ship.name, ship.getShipLength())));
        return arrayShipObj;
    }

    /**
     * Creates new player
     * @param name name of the player
     * @returns Player Object
     */
    createPlayer(name: string) : Player2 {
        const player = new Player2(name);
        player.setGameBoard(this.rows, this.cols);
        player.setPlayableFleets(this.getShipsObject());
        return player;
    }

    /**
     * Place ship in the board
     * @param player 
     * @param ship 
     * @param cell 
     */
    placeShip(player: Player2, ship: Ship, cell: Cell){
        player.placeShip(ship,cell);
    }

    /**
     * Attacks the opponent's cell 
     * @param activePlayer the attacker
     * @param targetPlayer the target player
     * @param cell the target cell
     * @returns boolean returns true if a ship is hit.
     */
    attackPlayer(activePlayer: Player2, targetPlayer: Player2, cell: Cell): boolean {
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