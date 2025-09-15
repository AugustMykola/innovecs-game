export type EventMap = {
    score: number;
};


export class EventBus<T extends Record<string, any>> {
    private listeners = new Map<keyof T, Set<(payload: any) => void>>();


    on<K extends keyof T>(event: K, cb: (payload: T[K]) => void): void {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set());
        this.listeners.get(event)!.add(cb as any);
    }


    off<K extends keyof T>(event: K, cb: (payload: T[K]) => void): void {
        this.listeners.get(event)?.delete(cb as any);
    }


    emit<K extends keyof T>(event: K, payload: T[K]): void {
        this.listeners.get(event)?.forEach((cb) => cb(payload));
    }
}