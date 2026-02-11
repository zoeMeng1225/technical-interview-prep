/**
 * Define a generic function type. 
 * This allows us to capture the exact parameter types of the original function.
 */

type GenericFunction = (...arg:any[]) => any;

/**
 * Define the return interface.
 * The returned function acts like the original function T,
 * but attaches two extra methods: .cancel() and .flush().
 */

interface DebouncedFunction<T extends GenericFunction> {
    (this: ThisParameterType<T>, ...args: Parameters<T>): void;
    cancel: () => void;
    flush: () => void;
} 

/**
 * @param func - The original function to be debounced.
 * @param wait - The delay in milliseconds.
 */

export default function debounceII<T extends GenericFunction>(func: Function, wait: number):GenericFunction<T>{
    //state variable(closure)
    let timer : ReturnType<typeof setTimeout> | null = null; //track the active timer ID, if null, no excution is pending
    let context : ThisParameterType<T> | null = null; //save 'this' context from the latest call
    let argsToInvoke : Parameters<T> | null = null; //save the arguments from the call
    
    const debounced = function(this: ThisParameterType<T>, ...args: Parameters<T>){
        //update state: every time the user triggers an event, overwrite the old context and args, we only care about latest action;
        context = this;
        argsToInvoke = args;

        //reset timer:if the timer is already running, kill it, this pushes the excution time back by another 'wait' duration;
        if(timer){
            clearTimeout(timer);
        }

        //set new timer 
        timer = setTimeout(() => {
            //only execute if we have valid arguments
            if(argsToInvoke){
                func.apply(context, argsToInvoke)
            }
            //cleanup: reset everything to null to prevent memory leak and ensure
            timer = null;
            context = null;
            argsToInvoke = null;
        }, wait);
    }

    //public method 
    //cancel(): abort the pending execution 
    debounced.cancel = () => {
        if(timer){
            clearTimeout(timer) //stop the clock
            timer = null; //clear ID
            context = null; //clear memory
            argsToInvoke = null; //clear memory
        }
    };

    //flush():immediately executes the pending function
    debounced.flush = () => {
        if(timer && argsToInvoke){
            //execute immediately 
            func.apply(context, argsToInvoke);
            
            //cancel the pending timer
            //if we don't cancel, the setTimeout will still fire later, it will causing the function run twice.
            debounced.cancel()
        }
    }

    return debounced;
}