export type Callback = () => void
// type Callback = () => {} -wrong- interpreted as fn returning {}

export class Eventing {
    events: { [key: string]: Callback[] } = {}

    // on(eventName: string, callback: () => {}) { }
    on = (eventName: string, callback: Callback): void => //using type alias
    {
        const handlers = this.events[eventName] || []//undefined when User is defined
        handlers.push(callback)
        this.events[eventName] = handlers
    }

    trigger = (eventName: string): void => {
        const handlers = this.events[eventName]
        if (!handlers || handlers.length === 0) return

        handlers.forEach((callback) => {
            callback()
        })
    }
}