import { Application, Container } from 'pixi.js';
import { randRange } from '../core/utils';
import type { IAnimal } from '../models/IAnimal';

export class Spawner {
    private timer = 0;

    constructor(
        private root: Container,
        private bounds: { x: number; y: number; w: number; h: number },
        private animals: IAnimal[],
        private createAnimal: (x: number, y: number) => IAnimal,
        private minInterval = 2,
        private maxInterval = 5,
        private maxCount = 25,
    ) {
        this.timer = this.nextInterval();
    }

    update(dt: number) {
        if (this.animals.length >= this.maxCount) {
            return;
        }

        this.timer -= dt;
        if (this.timer <= 0) {
            this.spawnOne();
            this.timer = this.nextInterval();
        }
    }

    private spawnOne() {
        if (this.animals.length >= this.maxCount) {
            return;
        }

        const x = randRange(this.bounds.x + 20, this.bounds.x + this.bounds.w - 20);
        const y = randRange(this.bounds.y + 20, this.bounds.y + this.bounds.h - 20);

        const a = this.createAnimal(x, y);
        this.animals.push(a);

        this.root.addChild(a as any);
    }

    private nextInterval() {
        return this.minInterval + Math.random() * (this.maxInterval - this.minInterval);
    }
}
