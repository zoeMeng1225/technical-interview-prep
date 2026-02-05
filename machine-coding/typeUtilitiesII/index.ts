/**
 * In Type Utilities, we have implemented utility functions to determine the types of primitive values. In this question, 
 * we will implement the following utility functions to determine the types of non-primitive values.
 * 
 * In Type Utilities, we have implemented utility functions to determine the types of primitive values. In this question, we will implement the following utility functions to determine the types of non-primitive values.

    isArray(value): Return true if value is an array, false otherwise.
    isFunction(value): Return true if value is a function, false otherwise.
    isObject(value): Return true if value is an object (e.g. arrays, functions, objects, etc, but not including null and undefined), false otherwise.
    isPlainObject(value): Return true if value is a plain object, false otherwise (for arrays, functions, etc).
    A plain object, or what is commonly known as a Plain Old JavaScript Object (POJO) is any object whose prototype is Object.prototype or an object created via Object.create(null).
 */

export function isArray(value: any): boolean{
    //robust way to check an array
    return Array.isArray(value);
}

export function isFunction(value :any): boolean{
    //check function value to use 'typeof' operator.
    return typeof value === 'function'
}

export function isObject(value:any):boolean{
    //requirement: return true for array, functions, and objects, but not including null and undefined), false otherwise.
    return value !== null && (typeof value === 'object' || typeof value === 'function')
}

export function isPlainObject(value:any): boolean{
    //ensure the value is a non-null object
    if(typeof value !== 'object' || value ===null) return false

    //get the prototype of the value
    const proto = Object.getPrototypeOf(value);

    //check the prototype to determine if it is a 'plain object'
    //case 1: Object create via Object.create(null) have a null prototype => return true;
    //case 2: Object create via literal {} or new Object() have Object.prototype => return true;
    //case 3: Object like new Date(), [], or new Myclass() have specific prototype => return false
    return proto === null || proto === Object.prototype
}

