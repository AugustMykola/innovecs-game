import {IAnimal} from "../models/IAnimal";
import {Vec2} from "../types";
import {randRange} from "../core/utils";

type Bounds = { x: number, y: number, w: number, h: number };

export class PatrolSystem {
    constructor(
        private bounds: Bounds,
        private wallMargin = 24,
        private padInside = 40
    ) {
    }

    update(delta: number, animals: IAnimal[]) {
        for (const animal of animals) {
            if (animal.state !== 'idle') continue;

            if (!animal.patrolTarget || this.dist(animal, animal.patrolTarget) < 1) {
                animal.patrolTarget = this.randomInside(this.padInside);
            }

            if (this.nearWall(animal)) {
                const safe = this.randomInside(this.padInside + 20);

                animal.patrolTarget = {
                    x: (animal.x * 0.3) + (safe.x * 0.7),
                    y: (animal.y * 0.3) + (safe.y * 0.7),
                };
            }

            this.moveTowards(animal, animal.patrolTarget, animal.patrolSpeed, delta);
        }
    }

    private dist(a: { x: number, y: number }, b: { x: number, y: number }) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    private moveTowards(animal: IAnimal, target: Vec2, speed: number, dt: number) {
        const dx = target.x - animal.x;
        const dy = target.y - animal.y;
        const d = Math.hypot(dx, dy);
        if (d < 0.5) return;

        const slowRadius = 40;
        const desiredSpeed = d < slowRadius ? speed * (d / slowRadius) : speed;
        const step = Math.min(desiredSpeed * dt, d);

        animal.x += (dx / d) * step;
        animal.y += (dy / d) * step;
    }

    private randomInside(pad: number) {
        const {x, y, w, h} = this.bounds;
        return {
            x: randRange(x + pad, x + w - pad),
            y: randRange(y + pad, y + w - pad),
        }
    }

    private nearWall(pad: { x: number, y: number }) {
        const {x, y, w, h} = this.bounds;
        return (
            pad.x < x + this.wallMargin ||
            pad.x > x + w - this.wallMargin ||
            pad.y < y + this.wallMargin ||
            pad.y > y + h - this.wallMargin
        );
    }
}