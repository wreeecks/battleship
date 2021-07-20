import { Cell } from "../_models/cell";
import { IShip } from "../_models/ship";

export enum shipOrientation {
    Horizontal,
    Vertical
}

export class Ship implements IShip{
    name!: string;
    shipLength!: number;
    shipOrientation: shipOrientation = shipOrientation.Horizontal;
    cells: Cell[] = [];
    isDestroyed: boolean = false;

}