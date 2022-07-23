import axios, { AxiosPromise } from "axios"
import { UserProps } from "./User"

interface HasId {
    id?: number
}


//ts doesnt know T has data prop, so to ensure that, T extends {interface}
export class Sync<T extends HasId> {
    constructor(public rootUrl: string) {
    }

    //know if some user has been backed on server
    //will have id
    fetch(id: number): AxiosPromise {
        return axios.get(`http://localhost:3000/users/${id}`)
    }

    save(data: T): AxiosPromise {
        const { id } = data // changes with "strict" in tsconfig.json

        if (id) {
            //put
            return axios.put(`${this.rootUrl}/${id}`, data)
        }
        else {
            //post req
            return axios.post(`${this.rootUrl}/`, data)
        }
        //if id in schema, its saved in server
    }
}