/**
 * Implement an EventEmitter class similar to the one in Node.js that follows such an observer pattern.

 */

//define a type alias for the listener function for better type safety and clarity
type Listeners = (...args: any[]) => void;

export default class EventEmitter{
    private events: Map<string, Listeners[]>;
    
    constructor(){
        this.events = new Map()
    }

    /**
   * Registers a listener for a specific event.
   * @param eventName - The name of the event.
   * @param listener - The callback function to be invoked.
   * @returns {this} Returns the current instance to allow method chaining.
   */

    on(eventName: string, listener: Listeners): this{
        if(!this.events.has(eventName)){
            this.events.set(eventName, [])
        }

        const listeners = this.events.get(eventName)!;
        listeners.push(listener);

        return this;
    }

    /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */

    off(eventName: string, listener: Listeners):this{
        if(!this.events.has(eventName)){
            return this;
        }

        const listeners = this.events.get(eventName)!;
        const index = listeners.indexOf(listener);
        //if the listener is found, remove it from the array
        if(index !== -1){
            listeners.splice(index,1)
        }

        return this;
    }

    emit(eventName:string, ...args:any[]):boolean{
        
        const listeners = this.events.get(eventName);    
        if(!listeners|| listeners.length === 0){
            return false
        }

        for(const listener of listeners){
            listener(...args)
        }
        
        return true;
    }

}