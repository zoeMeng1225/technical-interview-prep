import {describe, it, expect} from 'vitest';
import deepClone from '.';

describe('deepClone', () => {
    //primitive
    it('should clone promitive values correctly', () => {
        expect(deepClone(1)).toBe(1);
        expect(deepClone('hello')).toBe('hello');
        expect(deepClone(true)).toBe(true);
        expect(deepClone(null)).toBe(null);
        expect(deepClone(undefined)).toBe(undefined);
    });

    //arrays
    it('should deep clone arrays', () => {
        const original = [1, 2, { a: 3 }];
        const copy = deepClone(original);

        expect(copy).toEqual(original);
        expect(copy[2]).not.toBe(original[2]);
    });

    //mutation test
    it('should not affect original object when copy is mofified', () => {
        const original = {
            name: 'John',
            hobbies: ['coding', 'swimming'],
            stats: { level: 1 }
        };

        const copy = deepClone(original);

        copy.name = 'Bob';
        copy.hobbies.push('dancing');
        copy.stats.level = 99;

        expect(original.name).toBe('John');
        expect(original.hobbies).toEqual(['coding', 'swimming']);
        expect(original.stats.level).toBe(1);
    });

    //complex nesting
    it('should handle mixed nested structures', () => {
        const original = {
            users: [
                { id: 1, profile: { age: 18 } },
                { id: 2, profile: { age: 20 } }
            ]
        };

        const copy = deepClone(original);

        expect(copy).toEqual(original);
        
        copy.users[0].profile.age = 100;

        //verify original data not be affected
        expect(original.users[0].profile.age).toBe(18)
    })
})