//define a generic type F for the function
//it takes any arguments and return anything 
type F = (...args: any[]) => any

export default function debounce<T extends F>(func: T, wait: number){
    //declare a variable to store the timer id;
    //RetureType<Typeof setTimeout> works for both Node.js(timeout object) and Browser(number)
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function(this: ThisParameterType<T>, ...args:Parameters<T>){
        //capture the current This context
        //in ts, we explicitly type this in the function signature above
        const context = this;

        //if timer alreay running, cancel it
        if(timer){
            clearTimeout(timer)
        }

        //schedule a new execution
        timer = setTimeout(() => {
            //execute original function
            func.apply(context, args);
        },wait)
    }
}