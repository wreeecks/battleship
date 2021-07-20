import { shipOrientation } from "../_entities/ship";
import { Cell } from "./cell";

export interface IShip {
    name: string;
    shipLength: number;
    shipOrientation: shipOrientation;
    cells: Cell[];
    isDestroyed: boolean;
}