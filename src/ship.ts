import { Board } from "./Board";
import { Cell } from "./cell";
import { IShip } from "./_interfaces/IShip";
import { shipOrientation } from "./_models/enumShipOrientation";

export class Ship implements IShip {
    name: string;
    shipLength: number;
    shipOrientation: shipOrientation ;
    cells: Cell[] = [];
    
    constructor(name: string = "Ship", shipLength: number = 4, 
                orientation: shipOrientation = shipOrientation.Horizontal) {
        this.name = name;
        this.shipLength = shipLength;
        this.shipOrientation = orientation; 
    }

    positionShip(board: Board, startingPoint: Cell){
        
    }

    getShipCells(){
        return this.cells;
    }

    setOrientation(orientation: shipOrientation){
        this.shipOrientation = orientation;
    }

}