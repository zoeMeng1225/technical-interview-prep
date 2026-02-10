/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 *
 *
 */

export type ClassValue = ClassArray | ClassDictionary | string | number | null | undefined | boolean
export type ClassArray = Array<ClassValue>;
export type ClassDictionary = Record<string, any>;

export default function classNames(...args: Array<ClassValue>):string{
    //initialize an array to store the valid class name
    const classes: Array<string> = [];

    //iterate over each argument passed the function
    args.forEach(arg=> {
        //ignore falsy velues, it filer the null, undefined, false, 0 and empty string
        if(!arg){
            return; 
        }

        const argType = typeof arg;
        //primitive values: directly added to class list
        if(argType === 'string' || argType === 'number'){
            classes.push(String(arg))
            return;
        }

        //arrays: recursion
        if(Array.isArray(arg)){
            classes.push(classNames(...arg));
            return;
        }

        //object: dectionaries
        if(argType === 'object'){
            const objArg = arg as ClassDictionary;
            Object.keys(objArg).forEach(key => {
                if(objArg[key]){
                    classes.push(key)
                }
            })
        }
        return;
    });
    return classes.join(' ');

}