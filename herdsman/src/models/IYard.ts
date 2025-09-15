export interface IYard {
    x: number;
    y: number;
    containsXY(x:number, y:number): boolean;
}