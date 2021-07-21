import { Board } from "../Board";

export interface Player {
    id: number;
    name: string;
    board: Board;
}