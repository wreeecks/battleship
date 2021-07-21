import { Ship } from "./ship";
import { Cell } from "./_models/cell";
import { shipOrientation } from "./_models/enumShipOrientation";

export class ShipInPlay extends Ship {
    cells: Cell[] = [];
    isDestroyed: boolean = false;
    
    constructor(name: string, shipLength: number, orientation: shipOrientation ) {
        super(name, shipLength, orientation);
    }

}