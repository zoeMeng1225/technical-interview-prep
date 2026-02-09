/**
 * Deep clones a value(primitive, array, or object)
 * @param value - The value to be clone
 * @returns a deep copy of the input value
 */

export default function deepClone<T>(value: T): T{
    //base case: Primitives and Null
    if(value === null || typeof value !== 'object'){
        return value;
    }

    //array
    if(Array.isArray(value)){
        return value.map(item => deepClone(item)) as any; //casting as any is often needed here to satisfy TS compiler for recursive 
    }

    //object: if reach here , it is a non-null object
    const results: Record<string, any> = {};

    //iterate over the object's own enumerable value
    for(const key of Object.keys(value)){
        results[key] = deepClone((value as any)[key]);
    }

    return results as T;
}