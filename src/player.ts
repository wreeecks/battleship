import { Board } from "./board";
import { Ship } from "./ship";
import { Cell, CellState } from './models/cell';

export class Player {
    name: string;
    private board!: Board;
    private shipUnits!: Ship[];

    constructor(name: string) {
        this.name = name;
    }

    setGameBoard(row: number, cols: number) : void {
        this.board = new Board(row, cols);
    }

    setPlayableUnits(shipUnits: Ship[]) : void {
        this.shipUnits = shipUnits;
    }

    getBoard(){
        return this.board;
    }

    getShips(){
        return this.shipUnits;
    }

    /**
     * Place ship on the board
     * @param ship ship
     * @param cells starting cell
     */
    placeShip(ship: Ship, cell: Cell) : void {
        const shipCellRange = ship.getShipCellRangeOnBoard(this.board, cell);
        this.board.occupyCellRange(shipCellRange);
        ship.setShipPosition(shipCellRange);
    }

    /**
     * Attack opponent
     * @param player opponent
     * @param cell Opponent's board cell
     * @returns boolean returns true if a ship is hit, otherwise false
     */
    attack(opponent: Player, cell: Cell): boolean {
        opponent.board.attackCell(cell);
        
        if(opponent.board.isCellStateMatch(cell, CellState.Hit)){
            this.setPlayerShipDamage(opponent, cell);         
            // tslint:disable-next-line:no-console
            console.log("HIT!");
            return true;    
        }
         // tslint:disable-next-line:no-console
         console.log("MISS!")
        return false;
    }

    /**
     * Updates the player's ship cell state
     * @param opponent target opponent
     * @param cell target opponent's cell
     */
    private setPlayerShipDamage(opponent: Player, cell: Cell): void{
       
        const opponentShip = opponent.getShips().reduce((shipInCell, ship) => {
            const shipFound = ship.getShipPosition().find(p => p.gridRow === cell.gridRow && p.gridCol === cell.gridCol);
            if(shipFound) {
                shipInCell = ship;
            }
            return shipInCell;
        }, null)

        opponentShip.setShipDamage(cell);
    }

    /**
     * checks if there's remaining ships that's no destroyed
     * @returns boolean
     */
    hasRemainingShips(): boolean{
        const remainingShips = this.shipUnits.filter(s => s.isDestroyed() === false);

        return (remainingShips.length !== 0);
    }

}