/**
 * Polyfill for Promise.all
 * Takes an iterable of promises (or values) and returns a single Promise that resolves to an array of the results of the input promises.
 * @param iterable - An array of Promises or primitive values.
 * @returns A Promise that resolves to an array of results in the same order.
 */

export default function promiseAll<T>(iterable: Array<T | Promise<T>>):Promise<T[]>{
    return new Promise((resolve, reject) => {
        const results:T[] = [];
        let completedCount = 0;

        //edge case: empty input array
        if(iterable.length === 0){
            resolve([]);
            return;
        };

        //iterate through each item in the array
        iterable.forEach((item, index) => {
            //by using Promise.resolve(), ensure we can handle both async promises and sync value(like number, string)
            Promise.resolve(item).then(value => {
                //use index to ensure the output array maintains the same order as the input array regardless of which finishes first
                results[index] = value;
                completedCount++;

                if(completedCount === iterable.length){
                    resolve(results);
                }
            }).catch(err => reject(err))
        })

    })
}