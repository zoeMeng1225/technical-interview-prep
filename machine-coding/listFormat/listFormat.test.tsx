import {describe, it, expect, test} from 'vitest'
import listFormat from '.';


describe('listFormat', () => {
    //test basic function
    describe('Basic format', () => {
        test('returns empty string for empty array', () => {
            expect(listFormat([])).toBe("")
        });

        test('return single item directly', () => {
            expect(listFormat(['Bob'])).toBe('Bob')
        });

        test('join two items with "and"', () => {
            expect(listFormat(['Bob', 'Alice'])).toBe('Bob and Alice')
        });

        test('join multiple items with comma and "and"', () => {
            expect(listFormat(['Bob', 'Ben', 'Tim'])).toBe('Bob, Ben and Tim')
        });
    })

    //test options
    describe('Options handing', () => {
        test('removes duplicates when unique is true', () => {
            expect(listFormat(['Bob', 'Bob', 'Alice'],  {unique: true})).toBe('Bob and Alice')
        });

        test('sorts items when sorted is true', () => {
            expect(listFormat(['Bob', 'Alice', 'Tim'], {sorted: true})).toBe('Alice, Bob and Tim')
        });

        test('truncates list with "and X other(s)" when length is specified', () => {
            const items = ['Bob', 'Ben', 'Tim', 'Jane', 'John'];
            //display 3 items, 2 remaining
            expect(listFormat(items, {length: 3})).toBe('Bob, Ben, Tim and 2 other(s)')
        })
    });

    //test edge cases & combinations
    describe('Edge cases and Combinations', () => {
        test('ignore length option if it is larger than array length', () => {
            expect(listFormat(['Bob', 'Alice'], {length:5})).toBe('Bob and Alice')
        })

        test('ignore length option if it is 0 or negative', () => {
            expect(listFormat(['Bob', 'Alice'], {length: 0})).toBe('Bob and Alice')
            expect(listFormat(['Bob', 'Alice'], {length: -1})).toBe('Bob and Alice')
        })

        test('handles unique, sorted, and length options together', () => {
            const items = ['Bob', 'Alice', 'Bob', 'Tim', 'Jane'];
            //unique: ['Bob', 'Alice', 'Tim', 'Jane']
            //sort: ['Alice', 'Bob', 'Jane', 'Tim']
            //Limit 2: 'Alice, Bob' ... remaining 2
            expect(listFormat(items, {unique: true, sorted: true, length: 2})).toBe('Alice, Bob and 2 other(s)')
        })
    })
})