import {Vec2} from "../types";

export interface IHero {
    x: number;
    y: number;
    setTarget(targetVector: Vec2 | null): void;
    update(delta: number): void;
}