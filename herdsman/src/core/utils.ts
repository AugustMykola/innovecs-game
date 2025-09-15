import type { Vec2 } from '../types';


export function randRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function distance(a: Vec2, b: Vec2): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
}