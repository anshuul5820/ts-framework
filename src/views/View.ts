import { Callback } from "../models/Eventing";
import { Model } from "../models/Model";
import { User } from "../models/User";

// interface ModelForView {
//     on(eventName: string, callback: Callback): void
// }

// export abstract class View<T extends ModelForView>{
//every class in ts also acts as a type
//not using interface here bcoz UserForm also has refs to Model, so same interface has tobe defined in both places. 

export abstract class View<T extends Model<K>, K>{
    //Model requires UserProps type generic type, so the above syntax
    //first K is a ref to 2nd K

    regions: { [key: string]: Element } = {}

    constructor(public parent: Element, public model: T) {
        this.bindModel()
    }

    abstract template(): string

    //default implementation; could be overriden from child class   
    eventsMap(): { [key: string]: () => void } {
        return {}
    }

    //element where the view needs to be nested  
    regionsMap(): { [key: string]: string } {
        return {}
    }

    //not making abstract bcoz implementing it is optional for child classes
    onRender(): void {
    }

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap()

        for (let key in regionsMap) {
            const selector = regionsMap[key]
            const element = fragment.querySelector(selector)

            if (element)
                this.regions[key] = element
        }
    }

    //rerender dom when change is triggred
    bindModel = (): void => {
        this.model.on('change', () => { this.render() })
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }//DocumentFragment- used to represent html that's going to be attached to DOM soon.

    render(): void {
        this.parent.innerHTML = ''
        const templateElement = document.createElement('template')
        templateElement.innerHTML = this.template()
        this.bindEvents(templateElement.content)
        this.mapRegions(templateElement.content)

        this.onRender()

        this.parent.append(templateElement.content)
    }
}