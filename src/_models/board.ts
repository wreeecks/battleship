import { Cell } from "./cell";

export interface Board {
    row: number;
    cols: number;
    cells: Cell[];
}