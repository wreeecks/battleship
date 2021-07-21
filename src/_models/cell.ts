export interface ICell {
    gridRow: number;
    gridCol: number;
    isTicked: boolean;
    isTaken: boolean;
    isInUse: boolean;
}

export class Cell implements ICell{
    gridRow: number;
    gridCol: number;
    isTicked: boolean;
    isTaken: boolean;
    isInUse: boolean;

}