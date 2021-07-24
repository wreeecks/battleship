import { Board } from "./board";
import { Ship } from "./ship";
import { Cell, CellState } from './models/cell';

export class Player2 {
    name: string;
    private board!: Board;
    private shipUnits!: Ship[];
    private ready: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    setGameBoard(row: number, cols: number) : void {
        this.board = new Board(row, cols);
    }

    setPlayableFleets(shipUnits: Ship[]) : void {
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
        this.isAllShipUnitsInPlace();
    }

    /**
     * Check if all ships units are in place.
     * This will flag the user ready once all the ships are in place.
     * @returns
     */
    private isAllShipUnitsInPlace(): void {
        // find ships without cell position;
        const remainingShips = this.shipUnits.filter(s => s.getShipPosition().length === 0 );
        this.ready = !(remainingShips.length > 0);
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
    attack(opponent: Player2, cell: Cell): boolean {
        opponent.board.attackCell(cell);
        
        if(opponent.board.isCellState(cell, CellState.Hit)){
            this.setShipDamage(opponent, cell);    
            // tslint:disable-next-line:no-console
            console.log("HIT!")        
            return true;    
        }

        // tslint:disable-next-line:no-console
        console.log("MISS!")  
        return false;
    }

    /**
     * returns the ship th
     * @param cell 
     * @returns 
     */
    private getShipByCell(player: Player2, cell: Cell): Ship {
        return  player.getShips().find( s => {
            return s.getShipPosition().find(p => p.gridRow === cell.gridRow && p.gridCol === cell.gridCol);
        });
    }

    private setShipDamage(opponent: Player2, cell: Cell): void{
        const damagedShip = this.getShipByCell(opponent, cell);
        
        if(damagedShip){
            const damagedShipPosition = damagedShip.getShipPosition();
            const damagedCell = damagedShipPosition.find(p => p.gridRow === cell.gridRow && p.gridCol === cell.gridCol);
            damagedCell.cellState = CellState.Hit;
        }       
    }

    hasRemainingShips(){
        const remainingShips = this.shipUnits.filter(s => s.isDestroyed() === false);

        //remainingShips.forEach(s => console.log(s.getShipPosition()));
        return (remainingShips.length !== 0);
    }

}