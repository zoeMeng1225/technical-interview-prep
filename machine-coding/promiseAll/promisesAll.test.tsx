import {describe, it, expect} from 'vitest';
import promiseAll from '.';

describe('promiseAll', () => {
    //base function test: non-promise value(number, string);
    it('should resolve primitive values immediately', async() => {
        const input = [1, 2, 3];
        const result = await promiseAll(input);

        expect(result).toEqual([1, 2, 3]);
    });

    //promise
    it('should resolve an array of promises', async() => {
        const p1 = Promise.resolve(1);
        const p2 = Promise.resolve(2);
        const result = await promiseAll([p1, p2]);
    });

    //mixed types
    it('should handle mixed input of promises and values', async() => {
        const p1 = Promise.resolve(1);
        const val2 = 2;
        const p3 = Promise.resolve(3);
        const result = await promiseAll([p1, val2, p3])

        expect(result).toEqual([1, 2, 3]);
    });

    //order perservation
    //Even if the subsequent Promise is completed first, the order of the result array must be consistent with that of the input array
    it('should preserve the order of results regardless of completion time', async() => {
        const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 100));
        const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 10));

        const result = await promiseAll([slow, fast]);
        expect(result).toEqual(['slow', 'fast'])
    })

    //fail-fast, As long as there is one failure, the whole must fail immediately
    it('should reject immediately if any promise rejects', async () => {
        const p1 = new Promise(resolve => setTimeout(() => resolve('ok'),100));
        const p2 = Promise.reject('error');

        await expect(promiseAll([p1, p2])).rejects.toBe('error');
    })

    //empry array
    it('should resolve empty array immediately', async () => {
        const result = await promiseAll([]);
        expect(result).toEqual([]);
    });

    //Microtask Check
    it('should return a promise for empty array', () => {
        const result = promiseAll([]);
        expect(result).toBeInstanceOf(Promise);
        return expect(result).resolves.toEqual([]);
     });
})