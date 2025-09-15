export interface IScene {
    init(): Promise<void> | void;
    update(delta: number): void;
    destroy(): void;
}