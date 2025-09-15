import { Graphics } from 'pixi.js';
import { IYard } from "../models/IYard";


export class Yard extends Graphics implements IYard {
    constructor(public x0: number, public y0: number, public w: number, public h: number) {
        super();
        this.position.set(x0, y0);
        this.redraw();
    }
    redraw() {
        this.clear().rect(0, 0, this.w, this.h).fill({color: 0xF5D142 });
        this.alpha = 0.9;
    }
    containsXY(x: number, y: number): boolean {
        return x >= this.x0 && x <= this.x0 + this.w && y >= this.y0 && y <= this.y0 + this.h;
    }
}