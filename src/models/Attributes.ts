import { UserProps } from "./User"

export class Attributes<T> {
    constructor(private data: T) { }

    // get(propName: string): (string | number) {
    //      return this.data[propName]
    // }

    // get<K extends keyof T>(key: K): T[K] {
    //     return this.data[key]
    // }
    //this doesnt work bcoz this=user -> user.data=undefined, so error
    //fix- replace with arrow fn

    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key]
    }
    //K extends keyof T- K- key is of type T: the key is present in UserProps
    //for UserProps, get() can only be called with name, age, id
    //T[K]- return corresponding type

    set(updateProp: T): void {
        Object.assign(this.data, updateProp)
    }

    getAll(): T {
        return this.data
    }
}
//downside with current get()-> get returns just string, number
// if some other dtype is req, won't work, also, fns common to string, number will be accessible
//fix1: typeguard if(typeof id === 'number'){}- add typeguard everytime
//fix2: add type assertion: const id = attrs.get('id):number- add this for every field
//fix3: use advanced generics


// const attrs = new Attributes<UserProps>({
//     name: 'halua',
//     age: 34,
//     id: 5
// })


