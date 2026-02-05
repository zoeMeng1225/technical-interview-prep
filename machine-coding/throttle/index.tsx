
/**
 * Implement a throttle function which accepts a callback function and a wait duration. 
 * Calling throttle() returns a function which throttled invocations of the callback function following the behavior described above.
 */

/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */

function throttle<T extends any[]>(func:(...args: T) => void, wait: number):(...args:T)=> void {
    //flag to track if the function is currently in the cooldown period
    let isThrottled = false;

    return function(this:any, ...args: T){
        //if we are currently throttled(in cooldown), ignore this invocation
        if(isThrottled) {
            return;
        }

        //excute the function immediately(leading Edge)
        // we use .apply to ensure the correct 'this' context is passed
        func.apply(this, args);
        
        //set the flag to true to block subsequent calls
        isThrottled = true;

        //schedule a timeout to reset the flag after the wait duration
        setTimeout(() => {
            isThrottled = false
        }, wait);
    }
}

export default throttle