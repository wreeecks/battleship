import { shipOrientation } from "../_models/enumShipOrientation";

export interface IShip {
    name: string;
    shipLength: number;
    shipOrientation: shipOrientation;
}