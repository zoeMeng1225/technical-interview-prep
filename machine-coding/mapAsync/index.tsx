
/**
 * 
 * Implement a function mapAsync that accepts an array of items and maps each element with an asynchronous mapping function. The function should return a Promise which resolves to the mapped results.

 * @param iterable 
 * @param callbackFn 
 * @returns 
 */

/**
 * first i 'll return a new promise, i want handle the edge case right away, if the input array is empty, we should just 
 * return an empty array immediately to avoid unnecessary processing 
 */
export default function mapAsync<T, U>(iterable: Array<T>, callbackFn: (value: T) => Promise<U>):Promise<Array<U>>{
    return new Promise((resolve, reject) => {
        //edge case: if the input array empty, resolve immediately with an empty array
        if(iterable.length === 0) return resolve([]);
        //pre-allocate the result array to maintain the exact length
        const results:Array<U> = new Array(iterable.length);
        let completeCount = 0;

        //iteracte through each element in the input array
        iterable.forEach((item, index) => {
            //wrap the callback execution in Promise.resolve() as a safety net.
            //just in case callbackfn return a synchronous value instead of a promise
            Promise.resolve(callbackFn(item)).then(value => {
                //assign the result to its original index;
                //we can't use push(), becuase promises resolve at diffrent time, and we must preserve the original order.
                results[index] = value;
                completeCount++;
                
                //once all items are successfully processd, resolved the main outer promise 
                if(completeCount === iterable.length){
                    resolve(results)
                }
                //if any single task fails, reject the entire operation
            }).catch(error => reject(error))
        })
    })
}