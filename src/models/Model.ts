import { AxiosPromise, AxiosResponse } from "axios";
import { Callback } from "./Eventing";

interface ModelAttributes<T> {
    set(value: T): void
    getAll(): T
    get<K extends keyof T>(key: K): T[K]
}

interface Sync<T> {
    fetch(id: number): AxiosPromise
    save(data: T): AxiosPromise
}

interface Events {
    on(eventName: string, callback: Callback): void
    trigger(eventName: string): void
}

interface HasId {
    id?: number
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) { }

    // get on() {
    //     return this.events.on
    // }

    // get get() {
    //     return this.attributes.get
    // }

    // get trigger() {
    //     return this.events.trigger
    // }

    //shorthand syntax for getters
    on = this.events.on
    get = this.attributes.get
    trigger = this.events.trigger
    //above syntax wont work in previous implementation
    //reason: the class vars must be used in shorthand constructor syntax, not lke this.events= new Events() 
    //explanation: lecture: 183


    set(update: T) {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    fetch(): void {
        const id = this.get('id')
        if (typeof id !== 'number') {
            throw new Error('cannt fetch without id')
        }
        else {
            this.sync.fetch(id).then((res: AxiosResponse): void => {
                this.set(res.data)
            })
        }
    }

    save(): void {
        this.sync.save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger('save')
            })
            .catch(() => { this.trigger('error') })
    }
}