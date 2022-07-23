import { User, UserProps } from "../models/User"
import { View } from "./View"

export class UserForm extends View<User, UserProps> {

    onButtonClick(): void {
        console.log('hi there')
    }

    onSetAgeClick = (): void => {
        this.model.setRandomAge()
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input')
        if (input !== null) {
            const name = input.value
            this.model.set({ name })
        }
    }

    onSaveClick = (): void => {
        this.model.save()
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:button': this.onButtonClick,
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick
            // 'hover:h1': this.onHoverHeader,
            // 'drag:div': this.onDragDiv
        }
    }

    template(): string {
        return `
        <div>
        <h1>User form</h1>
        <div>User Name: ${this.model.get('name')}</div>
        <div>User Age: ${this.model.get('age')}</div>
        <input placeholder=${this.model.get('name')}/>
        <button class='set-name'>Click me</button>
        <button class='set-age'>Set random age</button>
        <button class='save-model'>Save user</button>
        </div>
        `
    }


}

//idea of UserForm-> parent- some html element that exists inside DOM.
//template: returns html that needs to be inserted in DOM.
//render: calls template, appends returned html to parent as a child