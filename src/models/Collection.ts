import axios, { AxiosResponse } from "axios";
import { Callback, Eventing } from "./Eventing";

export class Collection<T, K> {
    //K is for UserProps, value hasnt always have to be UserProps
    models: T[] = []
    events: Eventing = new Eventing()

    constructor(
        public rootUrl: string,
        public deserialize: (json: K) => T) { }
    //deserialize- callback to convert json to normal []; needs to be generic

    get on() {
        return this.events.on
    }

    get trigger() {
        return this.events.trigger
    }

    fetch(): void {
        axios.get(this.rootUrl)
            .then((response: AxiosResponse) => {
                response.data.forEach((value: K) => {
                    this.models.push(this.deserialize(value))
                })
                this.trigger('change')
            })
            .catch()
    }
}