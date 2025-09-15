import {Vec2} from "../types";

export interface IAnimal {
    x: number;
    y: number;
    state: AnimalState;
    patrolTarget: Vec2 | null;
    patrolSpeed: number;
    patrolRange: number;
    basePos: Vec2;

    setFollow(offset: Vec2): void;
    setIdle(): void;
    updateFollow(dt: number, target: { x: number; y: number }): void;
    updateIdle(dt: number): void;
}

export type AnimalState = 'idle' | 'follow';