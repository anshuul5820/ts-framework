import { Callback } from "./Eventing";

interface ModelAttributes<T> {
    set(value: T): void
    getAll(): T
}

interface Sync {
}

interface Events {
    on(eventName: string, callback: Callback): void
    trigger(eventName: string): void
}

export class Model {
}