import {Graphics} from 'pixi.js';
import type {Vec2} from '../types';
import {AnimalState, IAnimal} from "../models/IAnimal";

export class Animal extends Graphics implements IAnimal {
    radius: number = 12;
    state: AnimalState = 'idle';
    followOffset: Vec2 = {x: 0, y: 0};
    speed = 170;


    patrolTarget: Vec2 | null = null;
    patrolSpeed = 40;
    patrolRange = 80;
    basePos: Vec2;

    constructor(public x0: number, public y0: number) {
        super();
        this.position.set(x0, y0);
        this.basePos = {x: x0, y: y0};
        this.redraw();
    }


    setFollow(offset: Vec2) {
        this.state = 'follow';
        this.followOffset = offset;
    }


    setIdle() {
        this.state = 'idle';
    }


    updateIdle(dt: number) {
        if (!this.patrolTarget) {
            this.patrolTarget = {x: this.basePos.x, y: this.basePos.y};
        }

        const dx = this.patrolTarget.x - this.x;
        const dy = this.patrolTarget.y - this.y;
        const d = Math.hypot(dx, dy);

        const snapEps = 0.5;

        if (d <= snapEps) {
            this.patrolTarget = {
                x: this.basePos.x + (Math.random() - 0.5) * this.patrolRange * 2,
                y: this.basePos.y + (Math.random() - 0.5) * this.patrolRange * 2,
            };
            return;
        }

        const step = Math.min(this.patrolSpeed * dt, d);
        this.x += (dx / d) * step;
        this.y += (dy / d) * step;
    }


    updateFollow(dt: number, target: { x: number; y: number }) {
        const desiredX = target.x + this.followOffset.x;
        const desiredY = target.y + this.followOffset.y;

        const dx = desiredX - this.x;
        const dy = desiredY - this.y;
        const d = Math.hypot(dx, dy);

        const snapEps = 0.6;
        const stopRadius = 1.2;
        const maxSpeed = this.speed;
        const slowRadius = 40;

        if (d <= snapEps) {
            this.x = desiredX;
            this.y = desiredY;
            return;
        }

        const desiredSpeed = d < slowRadius ? maxSpeed * (d / slowRadius) : maxSpeed;
        const step = Math.min(desiredSpeed * dt, d);

        if (d <= stopRadius) {
            this.x = desiredX;
            this.y = desiredY;
            return;
        }

        this.x += (dx / d) * step;
        this.y += (dy / d) * step;
    }


    redraw() {
        this.clear().circle(0, 0, this.radius).fill({color: 0xFFFFFF})
    }
}