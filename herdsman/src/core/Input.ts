import { Application } from 'pixi.js';
import type { Vec2 } from '../types';


export class Input {
    private clickTarget: Vec2 | null = null;
    constructor(private app: Application) {
        const stage = this.app.stage;
        stage.eventMode = 'static';
        stage.hitArea = this.app.screen.clone();
        stage.on('pointerdown', (e) => {
            const p = e.global;
            this.clickTarget = { x: p.x, y: p.y };
        });
    }
    consumeClick(): Vec2 | null {
        const t = this.clickTarget;
        this.clickTarget = null;
        return t;
    }
}