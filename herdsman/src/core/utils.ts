import type { Vec2 } from '../types';


export function randRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}


export function clamp(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v));
}


export function distance(a: Vec2, b: Vec2): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
}


export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}