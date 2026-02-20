import { describe, it, expect } from 'vitest';
import mapAsync from '.';

describe('mapAsync()', () => {
    //happy path
    it('should map elements asynchronously', async() => {
        const input = [1, 2, 3];
        const asyncDouble = (num: number) => new Promise<number>(resolve => setTimeout(() => resolve(num * 2), 10));

        const result = await mapAsync(input, asyncDouble);
        expect(result).toEqual([2,4,6])
    });

    //edge case: empty array
    it('should return an empty array if input is empty', async() => {
        const input: number[] = [];
        const asyncDouble = (num: number) => Promise.resolve(num * 2);
    
        const result = await mapAsync(input, asyncDouble);
        expect(result).toEqual([]);
    });

    //key test
    it('should preserve the original order even if promises resolve out of order', async () => {
        const input =[50, 10, 30];
        const asyncIdentity = (num: number) => 
            new Promise<number>(resolve => setTimeout(() => resolve(num), num));
      
        const result = await mapAsync(input, asyncIdentity);
        expect(result).toEqual([50, 10, 30]);   
    });

    //if passed sync function
    it('should handle synchronous callbacks gracefully (Defensive Programming)', async () => {
        const input = [1, 2, 3];
        const syncDouble = (num: number) => num * 2 as any;

        const result = await mapAsync(input, syncDouble);
        expect(result).toEqual([2, 4, 6]);
    });

    //fail-fast
    it('should reject immediately if any promise rejects', async () => {
        const input = [1, 2, 3];
        const asyncFlaky = (num: number) => {
          if (num === 2) return Promise.reject(new Error('Failed at 2'));
          return Promise.resolve(num * 2);
        };

        
        await expect(mapAsync(input, asyncFlaky)).rejects.toThrow('Failed at 2');
    });
})