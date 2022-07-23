import axios, { AxiosResponse } from "axios"
import { Attributes } from "./Attributes"
import { Callback, Eventing } from "./Eventing"
import { Sync } from "./Sync"

export interface UserProps {
    id?: number
    name?: string
    age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User {
    //not adding in constructor bcoz we wont add events immediately after user creation. 
    //Callback[]: value of event: array of ()=>{}

    public events: Eventing = new Eventing()
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
    public attributes: Attributes<UserProps>

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs)
    }

    // on(eventName: string, callback: Callback) {
    //     this.events.on(eventName, callback)
    // }
    //without getter: con-> need to pass on all args to events.on();
    //if main implementation is changed, needs to be updated here too.
    //sol: use getter-> return ref of this.events.on
    //in index.ts-> const on = user.on; on('change', ()=>{})

    get on() {
        return this.events.on
    }

    get get() {
        return this.attributes.get
    }

    get trigger() {
        return this.events.trigger
    }


    set(update: UserProps) {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    fetch(): void {
        const id = this.attributes.get['id']
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

//if id present in data, 


//delegation model: user has instances of generic classes so it could be called directly from new User().save()
