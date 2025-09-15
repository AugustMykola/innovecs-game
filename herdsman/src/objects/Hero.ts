import { Graphics } from 'pixi.js';
import type { Vec2 } from '../types';
import { IHero } from "../models/IHero";


export class Hero extends Graphics implements IHero {
    speed: number = 200;
    radius: number = 18;
    target: Vec2 | null = null;


    constructor(x: number, y: number) {
        super();
        this.position.set(x, y);
        this.redraw();
    }

    setTarget(t: Vec2 | null) { this.target = t; }

    update(dt: number): void {
        if (!this.target) return;
        const stopRadius: number = 2;
        const snapEps: number = 0.5;
        const maxSpeed: number = this.speed;

        const dx: number = this.target.x - this.x;
        const dy: number = this.target.y - this.y;
        const d: number = Math.hypot(dx, dy);

        const desiredSpeed = d < 60 ? maxSpeed * (d / 60) : maxSpeed;
        const step = Math.min(desiredSpeed * dt, d);

        if (d <= snapEps) {
            this.x = this.target.x;
            this.y = this.target.y;
            this.target = null;

            return;
        }

        if (d <= stopRadius) {
            this.x = this.target.x;
            this.y = this.target.y;
            this.target = null;
            return;
        }

        this.x += (dx / d) * step;
        this.y += (dy / d) * step;
    }

    redraw() {
        this.clear().circle(0, 0, this.radius).fill({color: 0xE63946});
    }
}