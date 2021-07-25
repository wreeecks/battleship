import { Cell } from "./models/cell";
import { Player } from "./player";
import { Ship } from "./ship";

export class Battleship {
    rows: number = 10;
    cols: number = 10;
    player1!: Player;
    player2!: Player;
    shipsUnits: Ship[] = [
       new Ship("Carrier",  3),
       new Ship("Battleship",  5)
    ];

    /**
     * Creates a new instance of battleship game.
     * The default size of the board is 10x10, it can be overridden by providing the number of rows and columns.
     * @constructor
     * @param rows number of rows of the board
     * @param cols number of columns of the board
     * @param shipsUnits There are 2 default ships units (Carrier and BattleShip), it can be overridden by providing an array of ships.
     */
    constructor(rows?: number, cols?: number, shipsUnits?: Ship[]) {
        this.setBoardSize(rows, cols);
        this.setGameShipUnits(shipsUnits);
    }

    /**
     * Set board size based on the number of rows and columns
     * @param rows number of rows specified
     * @param cols number of cols specified
     */
    setBoardSize(rows?: number, cols?: number) : void {
        if (rows && cols){
            this.rows = rows;
            this.cols = cols;
        }
    }

    /**
     * Set the ship units available to both players
     * @param shipsUnits array of Ship
     */
    setGameShipUnits(shipsUnits?: Ship[]) : void {
        if(shipsUnits){
            this.shipsUnits = shipsUnits;
        }
    }

    /**
     * Initiate Game
     * Creates 2 players and generate its board
     */
    start(): void {
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
    createPlayer(name: string) : Player {
        const player = new Player(name);
        player.setGameBoard(this.rows, this.cols);
        player.setPlayableUnits(this.getShipsObject());
        return player;
    }

    /**
     * Place ship in the board
     * @param player 
     * @param ship 
     * @param cell 
     */
    placeShip(player: Player, ship: Ship, cell: Cell){
        player.placeShip(ship,cell);
    }

    /**
     * Attacks the opponent's cell 
     * @param activePlayer the attacker
     * @param targetPlayer the target player
     * @param cell the target cell
     * @returns boolean returns true if a ship is hit.
     */
    attackPlayer(activePlayer: Player, targetPlayer: Player, cell: Cell): boolean {
        const isHit = activePlayer.attack(targetPlayer, cell);
        if(isHit) this.checkWinner();
        return isHit;
    }

    /**
     * returns the winner, otherwise false
     * @returns Player 
     */
    checkWinner() : Player | null {
        if(!this.player1.hasRemainingShips()){
            return this.player2;
        }

        if(!this.player2.hasRemainingShips()){
            return this.player1;
        }

        return null;
    }
}