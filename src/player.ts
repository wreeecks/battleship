import { Board } from "./Board";
import { Ship } from "./ship";
import { Cell } from "./cell";

export class Player {
    name: string;
    private board!: Board;
    private ships!: Ship[];
    private ready: boolean = false;
    
    constructor(name: string) {
        this.name = name;
    }

    setGameBoard(row: number, cols: number) : void {
        this.board = new Board(row, cols);
    }

    setPlayableFleets(fleets: Ship[]) : void {
        this.ships = fleets;
    }

    getBoard(){
        return this.board;
    }

    getShips(){
        return this.ships;
    }

    /**
     * Place ship on the board
     * @param ship ship
     * @param cells starting cell
     */
    placeShip(ship: Ship, cell: Cell) : void {
        const shipCellRange = ship.getShipCellRangeOnBoard(this.board, cell);
        this.board.occupyCell(shipCellRange); 
        ship.setShipPosition(shipCellRange);
        this.checkIfReady();
    }

    /**
     * Remove ship off the board.
     * @param ship 
     */
    removeShip(ship: Ship) : void {
        this.board.freeCell(ship.getShipPosition());
    }
    
    /**
     * Check if all ships are in play.
     * This will flag the user ready once all the ships are in place.
     * @returns 
     */
    checkIfReady(){
        // find ships without cell position;
        const ship = this.ships.filter(s => {
            return s.getShipPosition().length === 0;
        });
        this.ready = !(ship.length > 0);
    }

    isReady() : boolean {
        return this.ready;
    }

    /**
     * Attack opponent
     * @param player opponent
     * @param cell Opponent's board cell
     * @returns boolean returns true if a ship is hit, otherwise false
     */
    attack(opponent: Player, cell: Cell) : boolean {
        opponent.board.tickCell(cell);
        return opponent.isHit(cell);
    }

    isHit(cell: Cell){
        // check if cell matches any ship position
        const damagedShip = this.ships.find(s => {
            const cellAddressMatch = s.shipPosition.filter(c => c.gridRow == cell.gridRow && c.gridCol == cell.gridCol);
            return (cellAddressMatch.length > 0);
        });

        if(damagedShip){
            damagedShip.setShipDamage(cell);
            return true;
        }

        console.log("MISS!")
        return false;
    }

    hasRemainingShips(){
        const remainingShips = this.ships.filter(s => s.isDestroyed === false);
        return (remainingShips.length != 0);
    }

}